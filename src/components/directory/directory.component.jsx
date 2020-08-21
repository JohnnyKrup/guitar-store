import React from "react"
import MenuItem from "../menu-item/menu-item.component"
import styled from "styled-components"

class Directory extends React.Component {
  constructor() {
    super()

    this.state = {
      sections: [
        {
          title: "Western",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          slug: "western-gitarren",
          id: 1,
        },
        {
          title: "Konzert",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          slug: "konzert-gitarren",
          id: 2,
        },
        {
          title: "Klassik",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          slug: "klassik-gitarren",
          id: 3,
        },
        {
          title: "Kinder",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          slug: "kinder-gitarren",
          size: "large",
          id: 4,
        },
        {
          title: "Flamenco",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          slug: "flamenco-gitarren",
          size: "large",
          id: 5,
        },
      ],
    }
  }

  render() {
    return (
      <Wrapper>
        {/* 
        Since the destructured map({, , ,}) function is getting longer and longer
        as well as the MenuItem repeating property={property} for each property 
        we can use the spread operator to shorten this procedure
        what you see blow is the same as: 

          this.state.sections.map(({ title, imageUrl, id, size, slug }) => (
          <MenuItem title={title} imageUrl={imageUrl} key={id} size={size} slug={slug}/>))
         */}
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export default Directory
