import React, { useEffect } from "react";
import { CSSRules } from "./styles";

export const DemoBanner = () => {
    useEffect(() => {
        const styleTag = document.createElement("style");
        document.head.appendChild(styleTag);
        CSSRules.forEach((rule) =>
            styleTag.sheet?.insertRule(rule, styleTag.sheet.cssRules.length),
        );
    }, []);

    return (
        <div
            className="banner"
            style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                padding: "8px 16px",
                backgroundColor: "#fff5e5",
                borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
            }}
        >
            {/* sider offset for center alignment */}
            <div
                style={{
                    width: "200px",
                }}
            />
                <div
                    className="content"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        color: "#4F564F",
                        display: "flex",
                        flexDirection: "row",
                        gap: "8px",
                    }}
                >
                    <span
                        className="text"
                        style={{
                            padding: "4px 0",
                            fontSize: "16px",
                            lineHeight: "24px",
                            textShadow: "0px 0px 4px rgba(255, 255, 255, 0.5)",
                        }}
                    >
                        <strong>Please note, is a private alpha deployment of vckit and should not be relied on to create or verify production credentials.</strong>
                    </span>
                </div>
        </div>
    );
};
