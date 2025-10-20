import { Stack, Typography } from "@mui/material";
import { EventTemplate } from "../data/eventTemplates";
import { useEventTemplate } from "../hooks/useEventTemplate";
import { usePayloadSubmit } from "../hooks/usePayloadSubmit";
import "@fontsource/jetbrains-mono";

type TemplateDisplayButtonProps = {
  template: EventTemplate;
  onTemplateChange: (template: EventTemplate) => void;
};

function TemplateDisplayButton({
  template,
  onTemplateChange,
}: TemplateDisplayButtonProps) {
  const handleTemplateChange = () => {
    onTemplateChange(template);
  };
  return (
    <button
      onClick={handleTemplateChange}
      style={{
        backgroundColor: "white",
        color: "black",
        width: "100%",
        padding: "0.75rem",
        fontFamily: "JetBrains Mono",
        fontWeight: "bold",
        borderRadius: "0.375rem",
        border: "1px solid #f97316",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "0.5rem",
      }}
    >
      {template.name}
    </button>
  );
}
export function TemplateDisplay() {
  const { eventTemplates } = useEventTemplate();
  const { setEventName, handlePayloadChange } = usePayloadSubmit();

  function handleTemplate(template: EventTemplate) {
    setEventName(template.eventType);
    handlePayloadChange(JSON.stringify(template.json, null, 2));
  }

  return (
    <Stack
      sx={{
        paddingTop: ".5rem",
      }}
    >
      <Typography variant="h6">Templates</Typography>
      {eventTemplates.map((template) => {
        return (
          <TemplateDisplayButton
            key={template.name}
            template={template}
            onTemplateChange={handleTemplate}
          />
        );
      })}
    </Stack>
  );
}
