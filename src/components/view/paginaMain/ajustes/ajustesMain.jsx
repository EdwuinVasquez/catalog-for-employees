import { React, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AjustesClave } from './clave';
import { AjustesContacto } from './contacto';
import { AjustesPregunta } from './pregunta';
import { AjustesNombre } from './nombre';

export function ControladorAjustes() {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Clave
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Puedes modificar tu contraseña de acceso</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AjustesClave></AjustesClave>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Contacto</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Actualiza tu numero de celular
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AjustesContacto></AjustesContacto>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Nombre
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Modifica tu nombre de usuario
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AjustesNombre></AjustesNombre>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>Pregunta y respuesta</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Modifica tu nombre de pregunta y respuesta de seguridad
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <AjustesPregunta></AjustesPregunta>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}