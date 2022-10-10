import pandas_datareader as web
import numpy as np
import seaborn as sns
import datetime
import pandas as pd
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.metrics import r2_score
from svm_pos import SVM_POS 
from Conv import conv1D


import mysql.connector

from mysql.connector import Error


mydb = mysql.connector.connect(
 host="localhost",
 user="root",
 passwd="",
 database="stock"
)

##################################  TCS ###################### 
from nsetools import Nse
nse=Nse()
print(nse)
q = nse.get_quote('tcs') # it's ok to use both upper or lower case for codes.
#print q
from pprint import pprint # just for neatness of display
#pprint(q)
print("buyprice")
print(q['buyPrice1'])

#datetime.datetime is a data type within the datetime module
start = datetime.datetime(2013, 9, 1)
end = datetime.datetime.today().date()
#end = datetime.datetime(2019, 5, 26)
 
#Taking stocks of APPLE
df = web.DataReader("TCS.NS", 'yahoo', start, end)
#You can use differnt stock name here
#df = web.DataReader("NVDA", 'yahoo', start, end)

#Savinng it into csv file
df.to_csv('TCS_stock_data.csv')

#Reading the data into Pandas
df=pd.read_csv('TCS_stock_data.csv')

#Seeing the first 10 rows and shape
df.head(10)
print (df.shape)

#Pre-Processing and Understanding the Data
df=df.drop(['Volume'],axis=1)

#Getting to know mean, std daviation, Interquartile ranges of data
df.describe()

##Checking if data has any missing values 
#print (df.isna().sum())

#See the pairwise correlation of data using pairplot
sns.pairplot(df,diag_kind='kde')

#We have 'date' column which we want to convert to single numeric value before processing
le = preprocessing.LabelEncoder()
date=le.fit_transform(df['Date'])
date=pd.DataFrame(date)

#Droping the original date column from dataframe
df=df.drop('Date',axis=1)

#Adding new encoded date column to our dataframe
df['Date']=date
#Once again checking the dataframe
df.head(10)

#Actual processing starts here
#Seperating dependent and independent columns 
y_actual=df.pop('Close')

X=df

#Now Spliting the data into train test 
print ('Splitting the data into train test')
#X_train, X_test, y_train, y_test = train_test_split(X, y_actual, test_size=0.30, random_state=1)
X_train=X[0:701]
X_test=X[701:]
y_train=y_actual[0:701]
y_test=y_actual[701:]

print ('Spliting Done.')
print ('---------------------------------------------------------------------')
print('X_train shape ',X_train.shape)
print('X_test.shape ',X_test.shape)
print(' y_train.shape ',y_train.shape)
print('y_test.shape ', y_test.shape)

print ('Running SVM with POS (Particle Swarm Optimization) Model')
y_predict=SVM_POS(X_train,y_train,X_test)

print (' ')
print ('Saving the predicted data into Excel File.')
#Saving the predicted data into Excel
result1=pd.DataFrame()
result1['Close_Actual']=y_test
result1['Close_predict']=y_predict
result1['Date']=le.inverse_transform(X_test['Date'])
result1.head(10)
result1.to_excel('TCS_Results_svm.xlsx',index=False)
print ('data saved succefully.')
#Cheking the accuracy of our model
print('Accuracy Score for SVM: ',r2_score(y_test,y_predict)*100)


plt.figure(figsize=(16,8))
plt.title('Actual Stock Close Values.')
plt.plot(y_test)

plt.figure(figsize=(16,8))
plt.title('Predicted Stock Close Values using SVM.')
a_masked = np.ma.masked_less_equal(y_predict, 164)

# plot the full line
plt.plot(y_predict, 'green')

# plot only the large values
plt.plot(a_masked, 'r', linewidth=2)
#plt.plot(y_new[y_predict>300],color='green')
plt.savefig('C:/xampp/htdocs/stock_predictor/tt/SVM_TCS.png')
#plt.show()


print("Todays_Value : " + str(y_predict[len(y_predict)-2]))
print("predicted_Value : " + str(y_predict[len(y_predict)-1]))

mycursor = mydb.cursor()
sql = "UPDATE predication SET val = %s WHERE camp = %s"
val = ( str(y_predict[len(y_predict)-1]), "tcs")
mycursor.execute(sql, val)
mydb.commit()



print ('\n\n\n')
print ('--------------------------------------------------------------------------------------------')
print ('Test accuracy Using Neural Network (CNN).')


import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import adam
from sklearn.preprocessing import StandardScaler

#print ('Normalizing the Train and Test seperately.')
#sc = StandardScaler()
#X_train_cnn= sc.fit_transform(X_train)
#X_test_cnn= sc.fit_transform(X_test)
#print ('Normalizing Done.')
print ('\n\n')

def cnn():
    global X_test
    y_pred=conv1D(X_train,y_train,X_test)
    
    #Plotting variable
    plt.figure(figsize=(16,8))
    plt.title('Predicted Stock Close Values using CNN.')
    a_masked = np.ma.masked_less_equal(y_pred, 165)

    # plot the full line
    plt.plot(y_pred, 'green')

    # plot only the large values
    plt.plot(a_masked, 'r', linewidth=2)
    
    #Saving the result in excel
    result2 = pd.DataFrame()
    result2['Close_Actual'] = y_test
    result2['Close_predict'] = y_pred
    result2['Date'] = le.inverse_transform(X_test['Date'])
    result2.head(10)
    result2.to_excel('TCS_Results_CNN.xlsx', index=False)
    
    print('Accuracy Score for CNN: ',r2_score(y_test,y_pred)*100)
    plt.savefig('C:/xampp/htdocs/stock_predictor/tt/CNN_TCS.png')
	
    print("Todays_Value : " + str(y_pred[len(y_pred)-2]))
    print("predicted_Value : " + str(y_pred[len(y_pred)-1]))
	
    mycursor = mydb.cursor()
    sql = "UPDATE predication SET cnn_res = %s WHERE camp = %s"
    cnn_res = ( str(y_pred[len(y_pred)-1]), "tcs")
    mycursor.execute(sql, cnn_res)
    mydb.commit()
#    plt.show()
print ('Calling CNN for Value Prediction')
cnn()



##################################  INFOSYS ###################### 
from nsetools import Nse
nse=Nse()
print(nse)
q = nse.get_quote('infy') # it's ok to use both upper or lower case for codes.
#print q
from pprint import pprint # just for neatness of display
#pprint(q)
print("buyprice")
print(q['buyPrice1'])

#datetime.datetime is a data type within the datetime module
start = datetime.datetime(2013, 9, 1)
end = datetime.datetime.today().date()
#end = datetime.datetime(2017, 12, 31)
 
#Taking stocks of APPLE
###df = web.DataReader(", 'yahoo', start, end)

df = web.DataReader("INFY.NS", 'yahoo', start, end)

#You can use differnt stock name here
#df = web.DataReader("NVDA", 'yahoo', start, end)

#Savinng it into csv file
df.to_csv('INFOSYS_stock_data.csv')

#Reading the data into Pandas
df=pd.read_csv('INFOSYS_stock_data.csv')

#Seeing the first 10 rows and shape
df.head(10)
print (df.shape)

#Pre-Processing and Understanding the Data
df=df.drop(['Volume'],axis=1)

#Getting to know mean, std daviation, Interquartile ranges of data
df.describe()

##Checking if data has any missing values 
#print (df.isna().sum())

#See the pairwise correlation of data using pairplot
sns.pairplot(df,diag_kind='kde')

#We have 'date' column which we want to convert to single numeric value before processing
le = preprocessing.LabelEncoder()
date=le.fit_transform(df['Date'])
date=pd.DataFrame(date)

#Droping the original date column from dataframe
df=df.drop('Date',axis=1)

#Adding new encoded date column to our dataframe
df['Date']=date
#Once again checking the dataframe
df.head(10)

#Actual processing starts here
#Seperating dependent and independent columns 
y_actual=df.pop('Close')

X=df

#Now Spliting the data into train test 
print ('Splitting the data into train test')
#X_train, X_test, y_train, y_test = train_test_split(X, y_actual, test_size=0.30, random_state=1)
X_train=X[0:701]
X_test=X[701:]
y_train=y_actual[0:701]
y_test=y_actual[701:]

print ('Spliting Done.')
print ('---------------------------------------------------------------------')
print('X_train shape ',X_train.shape)
print('X_test.shape ',X_test.shape)
print(' y_train.shape ',y_train.shape)
print('y_test.shape ', y_test.shape)

print ('Running SVM with POS (Particle Swarm Optimization) Model')
y_predict=SVM_POS(X_train,y_train,X_test)

print (' ')
print ('Saving the predicted data into Excel File.')
#Saving the predicted data into Excel
result1=pd.DataFrame()
result1['Close_Actual']=y_test
result1['Close_predict']=y_predict
result1['Date']=le.inverse_transform(X_test['Date'])
result1.head(10)
result1.to_excel('INFOSYS_Results_svm.xlsx',index=False)
print ('data saved succefully.')
#Cheking the accuracy of our model
print('Accuracy Score for SVM: ',r2_score(y_test,y_predict)*100)


plt.figure(figsize=(16,8))
plt.title('Actual Stock Close Values.')
plt.plot(y_test)

plt.figure(figsize=(16,8))
plt.title('Predicted Stock Close Values using SVM.')
a_masked = np.ma.masked_less_equal(y_predict, 164)

# plot the full line
plt.plot(y_predict, 'green')

# plot only the large values
plt.plot(a_masked, 'r', linewidth=2)
#plt.plot(y_new[y_predict>300],color='green')
plt.savefig('C:/xampp/htdocs/stock_predictor/tt/SVM_INFOSYS.png')
#plt.show()


print("Todays_Value : " + str(y_predict[len(y_predict)-2]))
print("predicted_Value : " + str(y_predict[len(y_predict)-1]))

mycursor = mydb.cursor()
sql = "UPDATE predication SET val = %s WHERE camp = %s"
val = ( str(y_predict[len(y_predict)-1]), "infosys")
mycursor.execute(sql, val)
mydb.commit()


print ('\n\n\n')
print ('--------------------------------------------------------------------------------------------')
print ('Test accuracy Using Neural Network (CNN).')


import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import adam
from sklearn.preprocessing import StandardScaler

#print ('Normalizing the Train and Test seperately.')
#sc = StandardScaler()
#X_train_cnn= sc.fit_transform(X_train)
#X_test_cnn= sc.fit_transform(X_test)
#print ('Normalizing Done.')
print ('\n\n')

def cnn():
    global X_test
    y_pred=conv1D(X_train,y_train,X_test)
    
    #Plotting variable
    plt.figure(figsize=(16,8))
    plt.title('Predicted Stock Close Values using CNN.')
    a_masked = np.ma.masked_less_equal(y_pred, 165)

    # plot the full line
    plt.plot(y_pred, 'green')

    # plot only the large values
    plt.plot(a_masked, 'r', linewidth=2)
    
    #Saving the result in excel
    result2 = pd.DataFrame()
    result2['Close_Actual'] = y_test
    result2['Close_predict'] = y_pred
    result2['Date'] = le.inverse_transform(X_test['Date'])
    result2.head(10)
    result2.to_excel('INFOSYS_Results_CNN.xlsx', index=False)
    
    print('Accuracy Score for CNN: ',r2_score(y_test,y_pred)*100)
    plt.savefig('C:/xampp/htdocs/stock_predictor/tt/CNN_INFOSYS.png')
	
    print("Todays_Value : " + str(y_pred[len(y_pred)-2]))
    print("predicted_Value : " + str(y_pred[len(y_pred)-1]))
	
    mycursor = mydb.cursor()
    sql = "UPDATE predication SET cnn_res = %s WHERE camp = %s"
    cnn_res = ( str(y_pred[len(y_pred)-1]), "infosys")
    mycursor.execute(sql, cnn_res)
    mydb.commit()
#    plt.show()
print ('Calling CNN for Value Prediction')
cnn()



##################################  CIPLA ###################### 
#datetime.datetime is a data type within the datetime module
start = datetime.datetime(2013, 9, 1)
end = datetime.datetime.today().date()
#end = datetime.datetime(2017, 12, 31)
 
#Taking stocks of APPLE
###df = web.DataReader(", 'yahoo', start, end)


#You can use differnt stock name here
df = web.DataReader("CIPLA.NS", 'yahoo', start, end)

#Savinng it into csv file
df.to_csv('CIPLA_stock_data.csv')

#Reading the data into Pandas
df=pd.read_csv('CIPLA_stock_data.csv')

#Seeing the first 10 rows and shape
df.head(10)
print (df.shape)

#Pre-Processing and Understanding the Data
df=df.drop(['Volume'],axis=1)

#Getting to know mean, std daviation, Interquartile ranges of data
df.describe()

##Checking if data has any missing values 
#print (df.isna().sum())

#See the pairwise correlation of data using pairplot
sns.pairplot(df,diag_kind='kde')

#We have 'date' column which we want to convert to single numeric value before processing
le = preprocessing.LabelEncoder()
date=le.fit_transform(df['Date'])
date=pd.DataFrame(date)

#Droping the original date column from dataframe
df=df.drop('Date',axis=1)

#Adding new encoded date column to our dataframe
df['Date']=date
#Once again checking the dataframe
df.head(10)

#Actual processing starts here
#Seperating dependent and independent columns 
y_actual=df.pop('Close')

X=df

#Now Spliting the data into train test 
print ('Splitting the data into train test')
#X_train, X_test, y_train, y_test = train_test_split(X, y_actual, test_size=0.30, random_state=1)
X_train=X[0:701]
X_test=X[701:]
y_train=y_actual[0:701]
y_test=y_actual[701:]

print ('Spliting Done.')
print ('---------------------------------------------------------------------')
print('X_train shape ',X_train.shape)
print('X_test.shape ',X_test.shape)
print(' y_train.shape ',y_train.shape)
print('y_test.shape ', y_test.shape)

print ('Running SVM with POS (Particle Swarm Optimization) Model')
y_predict=SVM_POS(X_train,y_train,X_test)

print (' ')
print ('Saving the predicted data into Excel File.')
#Saving the predicted data into Excel
result1=pd.DataFrame()
result1['Close_Actual']=y_test
result1['Close_predict']=y_predict
result1['Date']=le.inverse_transform(X_test['Date'])
result1.head(10)
result1.to_excel('CIPLA_Results_svm.xlsx',index=False)
print ('data saved succefully.')
#Cheking the accuracy of our model
print('Accuracy Score for SVM: ',r2_score(y_test,y_predict)*100)


plt.figure(figsize=(16,8))
plt.title('Actual Stock Close Values.')
plt.plot(y_test)

plt.figure(figsize=(16,8))
plt.title('Predicted Stock Close Values using SVM.')
a_masked = np.ma.masked_less_equal(y_predict, 164)

# plot the full line
plt.plot(y_predict, 'green')

# plot only the large values
plt.plot(a_masked, 'r', linewidth=2)
#plt.plot(y_new[y_predict>300],color='green')
plt.savefig('C:/xampp/htdocs/stock_predictor/tt/SVM_CIPLA.png')
#plt.show()


print("Todays_Value : " + str(y_predict[len(y_predict)-2]))
print("predicted_Value : " + str(y_predict[len(y_predict)-1]))

mycursor = mydb.cursor()
sql = "UPDATE predication SET val = %s WHERE camp = %s"
val = ( str(y_predict[len(y_predict)-1]), "cipla")
mycursor.execute(sql, val)
mydb.commit()



print ('\n\n\n')
print ('--------------------------------------------------------------------------------------------')
print ('Test accuracy Using Neural Network (CNN).')


import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import adam
from sklearn.preprocessing import StandardScaler

#print ('Normalizing the Train and Test seperately.')
#sc = StandardScaler()
#X_train_cnn= sc.fit_transform(X_train)
#X_test_cnn= sc.fit_transform(X_test)
#print ('Normalizing Done.')
print ('\n\n')

def cnn():
    global X_test
    y_pred=conv1D(X_train,y_train,X_test)
    
    #Plotting variable
    plt.figure(figsize=(16,8))
    plt.title('Predicted Stock Close Values using CNN.')
    a_masked = np.ma.masked_less_equal(y_pred, 165)

    # plot the full line
    plt.plot(y_pred, 'green')

    # plot only the large values
    plt.plot(a_masked, 'r', linewidth=2)
    
    #Saving the result in excel
    result2 = pd.DataFrame()
    result2['Close_Actual'] = y_test
    result2['Close_predict'] = y_pred
    result2['Date'] = le.inverse_transform(X_test['Date'])
    result2.head(10)
    result2.to_excel('CIPLA_Results_CNN.xlsx', index=False)
    
    print('Accuracy Score for CNN: ',r2_score(y_test,y_predict)*100)
    plt.savefig('C:/xampp/htdocs/stock_predictor/tt/CNN_CIPLA.png')
	
    print("Todays_Value : " + str(y_pred[len(y_pred)-2]))
    print("predicted_Value : " + str(y_pred[len(y_pred)-1]))
	
	
    mycursor = mydb.cursor()
    sql = "UPDATE predication SET cnn_res = %s WHERE camp = %s"
    cnn_res = ( str(y_pred[len(y_pred)-1]), "cipla")
    mycursor.execute(sql, cnn_res)
    mydb.commit()

#    plt.show()
print ('Calling CNN for Value Prediction')
cnn()



##########################################################################################################################

##########################################################################################################################

##########################################################################################################################



