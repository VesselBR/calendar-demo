import React from "react";

interface CustomAgendaViewProps {
  events: any[];
  resources: any[];
  date: Date;
  startHour: number;
  endHour: number;
}

export const CustomAgendaView: React.FC<CustomAgendaViewProps> = ({
  events,
  resources,
  date,
  startHour,
  endHour,
}) => {
  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Profissional
            </th>
            {hours.map((hour) => (
              <th key={hour} style={{ padding: 8, border: "1px solid #ccc" }}>
                {`${hour}:00`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource.id}>
              <td
                style={{
                  padding: 8,
                  border: "1px solid #ccc",
                  fontWeight: "bold",
                }}
              >
                {resource.title}
              </td>
              {hours.map((hour) => {
                const startTime = new Date(date);
                startTime.setHours(hour, 0, 0, 0);

                const endTime = new Date(date);
                endTime.setHours(hour + 1, 0, 0, 0);

                const match = events.find(
                  (evt) =>
                    evt.resourceId === resource.id &&
                    new Date(evt.start) <= startTime &&
                    new Date(evt.end) > startTime
                );

                return (
                  <td
                    key={hour}
                    style={{
                      padding: 8,
                      border: "1px solid #ccc",
                      backgroundColor: match ? "black" : "white",
                      color: match ? "white" : "black",
                    }}
                  >
                    {match ? match.title : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
