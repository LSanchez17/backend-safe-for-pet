describe('config can come from env', () => {
  test('environment variables set', () => {
    process.env.SECRET_KEY = 'superSecret';
    process.env.PORT = '8000';
    process.env.DATABASE_URL = 'DNE';
    process.env.NODE_ENV = 'AlsoDNE';

    const config = require(''./config');
    expect(config.SECRET_KEY).toEqual('superSecret');
    //remember, we set our port to a NUMBER with the + sign
    expect(config.PORT).toEqual(8000);
    expect(config.getDatabaseUri()).toEqual('DNE');
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    expect(config.getDatabaseUri()).toEqual('safepet');
    process.env.NODE_ENV = 'test';

    expect(config.getDatabaseUri()).toEqual('safepet_test');
  });
})

