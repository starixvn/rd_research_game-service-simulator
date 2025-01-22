import { AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { GameEvent } from "../../subjects/event";
import Accordion from "@mui/material/Accordion";
import { ExpandMore } from "@mui/icons-material";
import { JsonEditor } from "json-edit-react"
export function MessageDisplayItem({ event }: { event: GameEvent}) {
    return <Accordion slotProps={{ transition: { unmountOnExit: true, timeout: 0 } }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">{event.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <JsonEditor 
                data={event.payload ?? {}}
                restrictAdd
                restrictDelete
                restrictDrag
                restrictEdit
                rootName=""
                collapseAnimationTime={0}
                maxWidth="100%"
            />
        </AccordionDetails>
    </Accordion>
}