import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const NameStyles = styled.p`
    margin-top: -2rem;
    transform: rotate(-2deg);
    position: relative;
    z-index: 2;
    font-size: 5rem;
`


export default function SlicemasterPage({data: {person}}) {
    
    return (
        <>
        <SEO title={person.name} image={person.image.asset.src}/>
      <div className="center">
        <Img fluid={person.image.asset.fluid} />
        <NameStyles>
          <span className="mark">{person.name}</span>
        </NameStyles>
        <p>{person.description}</p>
      </div>
        </>
    );
}

export const query = graphql`
    query($slug: String!) {
        person: sanityPerson(slug: {current: {eq: $slug}}) {
            name
            id
            description
            image {
                asset {
                    fluid(maxWidth:1000, maxHeight: 750) {
                        ...GatsbySanityImageFluid
                    }
                }
            }
        }
    }
`;


