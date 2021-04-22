import React, { useEffect } from 'react'
import { LikeOutlined, EyeOutlined } from '@ant-design/icons'

import './style.less'

const Card = ({
  owner,
  collectionId,
  url,
  title,
  value,
  inAuction,
  lastBid,
  limit,
  rate,
  views,
  likes,
  onViewCollection = () => {},
  onClickLike,
  onClickCard,
}) => {
  useEffect(() => {
    onViewCollection()
  }, [onViewCollection])

  return (
    <div className='card' onClick={e => onClickCard(owner, collectionId)}>
      <div className='card-image'>
        {url ? (
          <img src={url} alt='Collection img' width={'100%'} />
        ) : (
          <div>:D IMAGE :P</div>
        )}
      </div>
      <div className='card-info'>
        <div className='card-info-collection'>
          <div className='card-info-title'>{title}</div>
          <div className='card-info-value'>{`${value} BNB ≈ ${Number(
            rate * value
          ).toFixed(2)} USD`}</div>
        </div>
        <div className='card-info-likes-views'>
          <div className='card-info-likes' onClick={() => onClickLike()}>
            {likes}
            <LikeOutlined />
          </div>
          <div className='card-info-views'>
            {views}
            <EyeOutlined />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
