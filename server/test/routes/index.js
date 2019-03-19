
describe('GET /jobs', function() {
  it('returns a list of jobs', function(done) {
    request.get('/jobs').expect(200).end((err, res) => {
      const { jobs } = res.body;
      expect(jobs.length > 0)
      done();
    })
  })
})