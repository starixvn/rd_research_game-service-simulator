import { AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { GameEvent } from "../../subjects/event";
import Accordion from "@mui/material/Accordion";
import { ExpandMore } from "@mui/icons-material";
import { JsonEditor } from "json-edit-react"

enum EventColors {
    FINISH = '#ffeb3b',
    START_PLACING_BET = '#a5d6a7',
    DEFAULT = '#fafafa',
    DISCONNECT = '#ff0000'
}

const getPayloadInfo = (payload: any) => {
    const isJsonObject = payload && typeof payload === 'object' && !Array.isArray(payload);
    const firstKey = isJsonObject && Object.keys(payload).length > 0 ? Object.keys(payload)[0] : '';
    return { firstKey };
};

const getBackgroundColor = (event: GameEvent): string => {
    if (event.payload?.finish) return EventColors.FINISH;
    if (event.payload?.spb) return EventColors.START_PLACING_BET;
    if (event.name === "disconnect") return EventColors.DISCONNECT;
    return EventColors.DEFAULT;
};

const MessageDisplayItem = ({ event }: { event: GameEvent}) => {
    const { firstKey } = getPayloadInfo(event.payload);

    return <Accordion 
        slotProps={{ transition: { unmountOnExit: true, timeout: 0 } }}
        sx={{ 
            backgroundColor: getBackgroundColor(event),
            '& .MuiAccordionSummary-root': {
              minHeight: '40px',
              '&.Mui-expanded': {
                  minHeight: '40px',
              }
            },
            '& .MuiAccordionSummary-content': {
                margin: '8px 0',
                '&.Mui-expanded': {
                    margin: '8px 0',
                }
            },
            '& .MuiAccordionDetails-root': {
                padding: '8px 16px'
            }
          }}
        
    >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">
            {event.name}
            {firstKey && (
              <Typography 
                component="span" 
                sx={{ 
                  marginLeft: 1,
                  color: 'text.secondary',
                  fontSize: '0.85em'
                }}
              >
                {firstKey}
              </Typography>
            )}
          </Typography>
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

export default MessageDisplayItem;