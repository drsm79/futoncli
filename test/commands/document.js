var specify      = require('specify')
  , helpers      = require('../helpers')
  , fixture      = require('../fixtures/test_doc.json')
  , run          = helpers.run
  , nixt         = helpers.nixt
  , futon_ok     = helpers.futon_ok
  , futon_not_ok = helpers.futon_not_ok
  , get_config   = helpers.get_config
  , config_path  = helpers.config_path
  , rev, rev2
  ;

helpers.setup();

specify("futon document", function (assert) {
  assert.expect(3);

  run("futon document")
  .expect(function (response) {
    futon_ok(assert, response)
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document list", function (assert) {
  assert.expect(3);

  run("futon document list")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document insert tdoc --file test/fixtures/test_doc.json", function (assert) {
  assert.expect(3);

  run("futon document insert tdoc --file ../test/fixtures/test_doc.json --test")
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("cat test_doc.json | futon document insert tdocpipe", function (assert) {
  assert.expect(3);

  nixt()
  .run("cat ../test/fixtures/test_doc.json | ./futon document insert tdocpipe -q " + config_path)
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document get", function (assert) {
  assert.expect(3);

  run("futon document get")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document get tdoc", function (assert) {
  assert.expect(3);

  run("futon document get tdoc")
  .expect(function (response) {
    futon_ok(assert, response);
    rev = response.stdout.match("_rev: \\'(.*)\\'")[1];
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document get tdocpipe", function (assert) {
  assert.expect(3);

  run("futon document get tdocpipe")
  .expect(function (response) {
    futon_ok(assert, response);
    rev2 = response.stdout.match("_rev: \\'(.*)\\'")[1];
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document get tdoc --raw", function (assert) {
  assert.expect(4);

  run("futon document get tdoc --raw")
  .expect(function (response) {
    futon_ok(assert, response);
    var doc = JSON.parse(response.stdout);
    fixture._id = 'tdoc';
    fixture._rev = rev;
    assert.deepEqual(doc, fixture);
  })
  .end(function () {
    assert.ok(true);
  });
});


specify("futon document destroy", function (assert) {
  assert.expect(3);

  run("futon document destroy")
  .expect(function (response) {
    futon_not_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document destroy tdoc", function (assert) {
  assert.expect(3);
  run("futon document destroy tdoc " + rev)
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify("futon document destroy tdocpipe", function (assert) {
  assert.expect(3);
  run("futon document destroy tdocpipe " + rev2)
  .expect(function (response) {
    futon_ok(assert, response);
  })
  .end(function () {
    assert.ok(true);
  });
});

specify.run(process.argv.slice(2));
