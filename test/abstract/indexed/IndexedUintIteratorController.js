const { bN, exampleUints } = require('../../testHelpers');

const ExampleIndexedController = artifacts.require('./ExampleIndexedController.sol');
const ExampleIndexedStorage = artifacts.require('./ExampleIndexedStorage.sol');

contract('IndexedAddressIteratorController', function () {
  let exampleIndexedController;
  let exampleIndexedStorage;
  beforeEach(async function () {
    exampleIndexedStorage = await ExampleIndexedStorage.new();
    exampleIndexedController = await ExampleIndexedController.new(exampleIndexedStorage.address);
  });

  describe('get_first_from_indexed_uints', function () {
    it('[collection is not empty] returns correct first item', async function () {
      assert.deepEqual(await exampleIndexedController.get_first_in_indexed_uints_collection.call('a'), exampleUints[1]);
    });
    it('[collection is empty] returns 0', async function () {
      await exampleIndexedStorage.remove_all_data_in_indexed_uints_collection('a');
      assert.deepEqual(await exampleIndexedController.get_first_in_indexed_uints_collection.call('a'), bN(0));
    });
    it('[index does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_first_in_indexed_uints_collection.call('blah'), bN(0));
    });
  });

  describe('get_last_from_indexed_uints', function () {
    it('[collection is not empty] returns correct last item', async function () {
      assert.deepEqual(await exampleIndexedController.get_last_in_indexed_uints_collection.call('a'), exampleUints[6]);
    });
    it('[collection is empty] returns 0', async function () {
      await exampleIndexedStorage.remove_all_data_in_indexed_uints_collection('a');
      assert.deepEqual(await exampleIndexedController.get_last_in_indexed_uints_collection.call('a'), bN(0));
    });
    it('[index does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_last_in_indexed_uints_collection.call('blah'), bN(0));
    });
  });

  describe('get_next_from_indexed_uints', function () {
    it('[item is not last] returns correct next item', async function () {
      assert.deepEqual(await exampleIndexedController.get_next_in_indexed_uints_collection.call('a', exampleUints[4]), exampleUints[5]);
    });
    it('[item is last] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_next_in_indexed_uints_collection.call('a', exampleUints[6]), bN(0));
    });
    it('[item does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_next_in_indexed_uints_collection.call('a', bN(100)), bN(0));
    });
    it('[collection is empty] returns 0', async function () {
      await exampleIndexedStorage.remove_all_data_in_indexed_uints_collection('a');
      assert.deepEqual(await exampleIndexedController.get_next_in_indexed_uints_collection.call('a', bN(100)), bN(0));
    });
    it('[index does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_next_in_indexed_uints_collection.call('blah', exampleUints[1]), bN(0));
    });
  });

  describe('get_previous_from_indexed_uints', function () {
    it('[item is not first] returns correct previous item', async function () {
      assert.deepEqual(await exampleIndexedController.get_previous_in_indexed_uints_collection.call('a', exampleUints[4]), exampleUints[3]);
    });
    it('[item is last] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_previous_in_indexed_uints_collection.call('a', exampleUints[1]), bN(0));
    });
    it('[item does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_previous_in_indexed_uints_collection.call('a', bN(100)), bN(0));
    });
    it('[collection is empty] returns 0', async function () {
      await exampleIndexedStorage.remove_all_data_in_indexed_uints_collection('a');
      assert.deepEqual(await exampleIndexedController.get_previous_in_indexed_uints_collection.call('a', bN(100)), bN(0));
    });
    it('[index does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_previous_in_indexed_uints_collection.call('blah', exampleUints[1]), bN(0));
    });
  });

  describe('get_total_indexed_uints', function () {
    it('[collection is not empty] returns correct number of items', async function () {
      assert.deepEqual(await exampleIndexedController.get_total_in_indexed_uints_collection.call('a'), bN(6));
    });
    it('[collection is empty] returns 0', async function () {
      await exampleIndexedStorage.remove_all_data_in_indexed_uints_collection('a');
      assert.deepEqual(await exampleIndexedController.get_total_in_indexed_uints_collection.call('a'), bN(0));
    });
    it('[index does not exist] returns 0', async function () {
      assert.deepEqual(await exampleIndexedController.get_total_in_indexed_uints_collection.call('blah'), bN(0));
    });
  });
});
