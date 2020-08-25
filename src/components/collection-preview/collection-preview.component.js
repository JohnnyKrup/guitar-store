import React from "react"
import styled from "styled-components"
import CollectionItem from "../collection-item/collection-item.component"

const CollectionPreview = ({ title, items }) => {
  return (
    <Wrapper>
      <h1 className="title">{title}</h1>
      <div className="preview">
        {
          /**
           * since in our preview we want just 4 items,
           * we use the filter() function, before the map()
           *
           * PERFORMANCE CONCERN
           * Anonymous functions within components get called & rerendered
           * every time the component is called
           */
          items
            .filter((item, idx) => idx < 4)
            .map((item) => (
              <CollectionItem key={item.id} item={item} />
            ))
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .title {
    font-size: 28px;
    margin-bottom: 25px;
    text-transform: uppercase;
  }

  .preview {
    display: flex;
    justify-content: space-between;
  }
`

export default CollectionPreview
