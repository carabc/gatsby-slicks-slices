import path, { resolve } from 'path';


async function turnPizzasIntoPages({graphql, actions}) {
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query all pizzas
    const {data} = await graphql(`
        query {
            pizzas: allSanityPizza {
                nodes {
                    name
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // 3. Loop over each pizza and create a page for that pizza
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            // what is the url for this new page??
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current
            }
        });
    });
}

async function turnToppingsIntoPages({graphql, actions}) {
    // 1. Get the template
    const toppingTemplate = path.resolve("./src/pages/pizzas.js");
    // 2. Query all the toppings
    const { data } = await graphql(`
    query {
        toppings: allSanityTopping {
            nodes {
                name
                id
            }
        }
    }
    `);
    // 3. createPage for that topping
    data.toppings.nodes.forEach(topping => {
        actions.createPage({
          // what is the url for this new page??
          path: `topping/${topping.name}`,
          component: toppingTemplate,
          context: {
            topping: topping.name,
            // TODO Regex for topping
          },
        });
    })
    // 4. Pass topping data to pizza.js
}

async function turnSlicemastersIntoPages({graphql, actions}) {
    // 1. Query all slicemasters
    const {data} = await graphql(`
        query {
            slicemasters: allSanityPerson {
                totalCount 
                nodes {
                    name
                    id
                    slug {
                        current
                    }
                }
            }
        }
    `);
    // TODO 2. turn each slicemaster into their own page 
    {data.slicemasters.nodes.forEach(slicemaster => {
        actions.createPage({
            component: resolve('./src/templates/Slicemaster.js'),
            path: `/slicemaster/${slicemaster.slug.current}`,
            context: {
                name: slicemaster.person,
                slug: slicemaster.slug.current,
            }
        })
    })}
    // 3. Figure out how many pages their are based on how many slicemasters there are, and how many per page
    const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
    const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
    // 4. Loop from 1 to n and create the pages for them
    Array.from({length: pageCount}).forEach((_, i) => {
        actions.createPage({
            path: `/slicemasters/${i + 1}`,
            component: path.resolve('./src/pages/slicemasters.js'),
            // this data is passed to the template when we create it
            context: {
                skip: i * pageSize,
                currentPage: i + 1,
                pageSize,
            },
        })
    });
}

export async function createPages(params) {
    // Create pages dynamically
    // Wait for all promises to be resolved before finishing this function
    await Promise.all([
        turnPizzasIntoPages(params),
        turnToppingsIntoPages(params),
        turnSlicemastersIntoPages(params),
    ]);
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters
}