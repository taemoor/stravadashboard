module.exports.doesCollectionExist = async (model, collectionName) => {
  let collectionFound = false
  const list = await model.db.db.listCollections().toArray()
  list.forEach(collection => {
    if (collection.name.includes(collectionName)) {
      collectionFound = true
    }
  })
  return collectionFound
}
