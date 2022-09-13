// specific gatsby file that allows us to hook into different gatbsy api's if we need to.
import React from "react";
import Layout from "./src/components/Layout";
import { OrderProvider } from "./src/components/OrderContext";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}



export function wrapRootElement({ element }) {
  return <OrderProvider>{element}</OrderProvider>;
}