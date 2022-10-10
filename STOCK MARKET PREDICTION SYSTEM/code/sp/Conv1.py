
def conv1D(x_train,y_train,x_test):
    import keras
    from keras.wrappers.scikit_learn import KerasRegressor
    from keras.models import Sequential
    from keras.layers import Dense, Dropout,Conv1D,MaxPooling,Flatten
    from keras.optimizers import adam
    from sklearn.preprocessing import StandardScaler
     def build_regressor():
	     verbose, epochs, batch_size = 0, 150, 16
         n_timesteps, n_features, n_outputs = x_train.shape[1], x_train.shape[2], y_train.shape[1]
         model = Sequential()
         model.add(Conv1D(filters=64, kernel_size=3, activation='relu', input_shape=(n_timesteps,n_features)))
         model.add(Conv1D(filters=64, kernel_size=3, activation='relu'))
         model.add(Dropout(0.5))
         model.add(MaxPooling1D(pool_size=2))
         model.add(Flatten())
         model.add(Dense(100, activation='relu'))
         model.add(Dense(n_outputs, activation='softmax'))
         model.summary()
         model.compile(loss='mean_squared_error', batch_size=batch_size, optimizer='adam', metrics=['accuracy'])
         return model

    regressor = KerasRegressor(build_fn=build_regressor, batch_size=32, epochs=150)
    print ('Training the CNN Model...')
    history = regressor.fit(x_train, y_train)
    print ('Training Done')
    y_pred = regressor.predict(x_test)
    return y_pred
