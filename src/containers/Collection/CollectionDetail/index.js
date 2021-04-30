import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { collectionStateSelector, profileStateSelector } from 'redux/selectors'
import { getCollectionsAction } from 'redux/Reducers/Collection'

import { storage } from 'configuration/Firebase'

import CollectionDetailComponent from 'components/CollectionDetail'

const CollectionDetail = ({
  match,
  collection,
  profile,
  getCollectionsAction,
}) => {
  const profileData = profile.me
  const [currentCollection, setCurrentCollection] = useState({})
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (profileData) {
      getCollectionsAction({
        params: profileData.walletId,
        onSuccess: ({ data }) => {
          data.map(
            (item, index) =>
              item.name === match.params.collectionId &&
              setCurrentCollection(item)
          )
        },
      })
    }
  }, [getCollectionsAction, profileData, match])

  const customRequest = async ({ onError, onSuccess, file }) => {
    const metadata = {
      contentType: 'image/jpeg',
    }
    const storageRef = await storage.ref('image')
    const imageName = file.uid //a unique name for the image
    const imgFile = storageRef.child(imageName)
    try {
      console.log('start_upload')
      const image = await imgFile.put(file, metadata)
      setImageUrl(await imgFile.getDownloadURL())
      onSuccess && onSuccess(null, image)
    } catch (e) {
      console.log(e)
      onError && onError(e)
    }
  }

  const onChangeHandler = event => {
    event.preventDefault()

    const target = event.target.name

    switch (target) {
      default:
        break
    }
  }

  const onCreateHandler = () => {}

  return (
    <CollectionDetailComponent
      bannerUrl={currentCollection.url}
      name={currentCollection.name}
      description={currentCollection.description}
      tokens={[]}
      onChange={onChangeHandler}
      onCreate={onCreateHandler}
      customRequest={customRequest}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  collection: collectionStateSelector,
  profile: profileStateSelector,
})

const mapDispatchToProps = {
  getCollectionsAction,
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetail)
