
export interface EmailResponse {
  success: boolean;
  message: string;
}

export const emailService = {
  /**
   * Sends the invitation image to the serverless backend.
   */
  sendInvitation: async (email: string, guestName: string, imageBase64: string): Promise<EmailResponse> => {
    try {
      // Points to relative path /api/send-invite which Vercel handles
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          guestName,
          image: imageBase64
        }),
      });

      if (!response.ok) {
        throw new Error('Server responded with error');
      }

      return await response.json();
    } catch (error) {
      console.error("Email service error:", error);
      return { success: false, message: "Failed to connect to email server. Ensure Vercel environment variables are set." };
    }
  }
};
