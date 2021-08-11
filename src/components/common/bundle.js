import React from "react";

export const Bold = props => <b>{props.children}</b>

export const Image = props => <img src={props.src} height={props.height} width={props.width}>{props.children}</img>

export const Text = props => <p>{props.children}</p>