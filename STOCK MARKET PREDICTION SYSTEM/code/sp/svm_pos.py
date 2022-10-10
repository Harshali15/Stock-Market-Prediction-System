def SVM_POS(x_train,y_train,x_test):
    #Training the train data
    from sklearn import svm
    print ('---------------------------------------------------------------------')
    print ('Training the SVM Model...')
    clr = svm.SVR(C=1,kernel='linear')
    clr.fit(x_train, y_train)
    print ('Training Completed.')
    print ('---------------------------------------------------------------------')
    #MAking predictions
    y_predict=clr.predict(x_test)
    return y_predict
