import { NextResponse } from "next/server";
import type { EmployeeFeedbackPayload } from "@/features/samvaad-form/types";

const BACKEND_BASE_URL =
  process.env.BACKEND_API_BASE_URL?.trim() || "https://api.enggis.com";
const BACKEND_ENDPOINT = "/api/employee-feedback";

export async function POST(request: Request) {
  try {
    const payload: EmployeeFeedbackPayload = await request.json();

    // Basic structure validation
    if (!payload || typeof payload !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payload: request body must be a JSON object",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(payload.responses)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payload: 'responses' array is required",
        },
        { status: 400 }
      );
    }

    const backendUrl = `${BACKEND_BASE_URL.replace(/\/+$/, "")}${BACKEND_ENDPOINT}`;

    // Forward request to backend at https://api.enggis.com/api/employee-feedback
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await backendResponse.text();
    let backendData: unknown = null;

    try {
      backendData = JSON.parse(responseText);
    } catch {
      backendData = responseText;
    }

    if (!backendResponse.ok) {
      const errorMsg =
        typeof backendData === "object" && backendData !== null
          ? (backendData as { message?: string; error?: string }).message ||
            (backendData as { message?: string; error?: string }).error ||
            `Backend service returned HTTP ${backendResponse.status}`
          : typeof backendData === "string" && backendData.trim()
          ? backendData
          : `Backend service returned HTTP ${backendResponse.status}`;

      return NextResponse.json(
        {
          success: false,
          message: errorMsg,
          data: backendData,
        },
        { status: backendResponse.status }
      );
    }

    const successMessage =
      typeof backendData === "string" && backendData.trim()
        ? backendData
        : typeof backendData === "object" &&
          backendData !== null &&
          "message" in backendData
        ? String((backendData as { message: unknown }).message)
        : "Employee feedback submitted successfully";

    return NextResponse.json(
      {
        success: true,
        message: successMessage,
        data: backendData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/employee-feedback route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error occurred";

    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Employee Feedback API Route",
    backendUrl: `${BACKEND_BASE_URL.replace(/\/+$/, "")}${BACKEND_ENDPOINT}`,
    method: "POST",
    expectedPayload: {
      company: "string",
      department: "string",
      tenure: "string",
      roleLevel: "string",
      responses: [
        {
          section: "string",
          subheading: "string",
          questionText: "string",
          rating: "string",
          comment: "string",
        },
      ],
      startStopContinue: "string",
      additionalSuggestions: "string",
    },
  });
}
