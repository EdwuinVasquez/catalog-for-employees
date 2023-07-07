//importacion de librerias
import { React, useState } from "react";
import { Badge } from "@mui/material";
import { BsCart3 } from "react-icons/bs";

export function CarritoBoton({numero}) {
  return(
    <Badge color="primary" badgeContent={numero} showZero>
  		<BsCart3></BsCart3>
		</Badge>
	);
};