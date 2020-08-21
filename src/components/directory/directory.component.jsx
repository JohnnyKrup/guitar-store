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
          id: 1,
        },
        {
          title: "Konzert",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          id: 2,
        },
        {
          title: "Klassik",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          id: 3,
        },
        {
          title: "Kinder",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          size: "large",
          id: 4,
        },
        {
          title: "Flamenco",
          imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
          size: "large",
          id: 5,
        },
      ],
    }
  }

  render() {
    return (
      <Wrapper>
        {this.state.sections.map(({ title, imageUrl, id, size }) => (
          <MenuItem title={title} imageUrl={imageUrl} key={id} size={size} />
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
