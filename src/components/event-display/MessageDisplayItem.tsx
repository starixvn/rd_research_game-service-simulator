import { AccordionSummary, Typography, AccordionDetails, Box } from "@mui/material";
import { GameEvent, GameEventType } from "../../subjects/event";
import Accordion from "@mui/material/Accordion";
import { ExpandMore } from "@mui/icons-material";
import { JsonEditor } from "json-edit-react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CancelIcon from '@mui/icons-material/Cancel';

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

const getIcon = (event: GameEvent) => {
  switch(event.type) {
    case GameEventType.RECEIVE: return <ArrowDownwardIcon sx={{paddingRight: "1rem"}}/>;
    case GameEventType.SENT: return <ArrowUpwardIcon/>
    default: return <CancelIcon/>
  }
}

const getBackgroundColor = (event: GameEvent): string => {
    if (event.payload?.finish) return EventColors.FINISH;
    if (event.payload?.spb) return EventColors.START_PLACING_BET;
    if (event.name === "disconnect") return EventColors.DISCONNECT;
    return EventColors.DEFAULT;
};

const getTimeDisplay = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const miliseconds = date.getMilliseconds();

  return `${hours}:${minutes}:${seconds}:${miliseconds}`;
}

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
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}>
              <Box>
              {getIcon(event)}
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
            </Box>
            <Typography component="span" 
                  sx={{ 
                    marginLeft: 1,
                    color: 'text.secondary',
                    fontSize: '0.85em'
                  }}>
                    ⏰ {getTimeDisplay(event.timestamp)}
            </Typography>
          </Box>
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