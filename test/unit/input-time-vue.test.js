import InputTime from './../../input-time-vue';
import Vue from 'vue';



describe('init infinite-scroll directive', () => {
  beforeAll(done => {
    Vue.use(InputTime);
    done();
  });

  it('directive installed', done => {
    expect(InputTime.installed).toBe(true);
    done();
  });
});

