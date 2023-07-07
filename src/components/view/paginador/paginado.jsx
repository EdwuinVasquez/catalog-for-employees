/*-- Librerias --*/
import { React, useState } from 'react';
import { Pagination } from '@mui/material';

export function PaginadorBasico({numeroPaginas, navegar}) {
	const cambioPagina = (e, number) =>{
		navegar(number-1);
	}

	return (
    <>
		<Pagination onChange={cambioPagina} count={numeroPaginas} color="primary" />
    </>
	);
}