
def conv1D(x_train,y_train,x_test):
    import keras
    from keras.wrappers.scikit_learn import KerasRegressor
    from keras.models import Sequential
    from keras.layers import Dense, Dropout
    from keras.optimizers import adam
    from sklearn.preprocessing import StandardScaler
    def build_regressor():
        regressor = Sequential()
        regressor.add(Dense(units=5, activation='relu', input_dim=5))
        regressor.add(Dense(units=15, activation='relu'))
        regressor.add(Dense(units=1))
        regressor.compile(optimizer='adam', loss='mean_squared_error', metrics=['mae'])
        return regressor

    regressor = KerasRegressor(build_fn=build_regressor, batch_size=32, epochs=105)
    print ('Training the CNN Model...')
    history = regressor.fit(x_train, y_train)
    print ('Training Done')
    y_pred = regressor.predict(x_test)
    return y_pred
