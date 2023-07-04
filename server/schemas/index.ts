import mongoose from 'mongoose';

const dbUrl = 'mongodb://gschoi:1234@localhost:27017/admin';

const connectDB = () => {
  // 만일 배포용이 아니라면, 디버깅 on
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
  }

  mongoose.connect(dbUrl, { dbName: 'mingky' }, error => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }

    mongoose.connection.on('error', error => {
      console.error('몽고디비 연결 에러', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
      connectDB();
    });
  });
};

export default connectDB;
