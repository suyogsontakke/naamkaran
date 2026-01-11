
export interface EmailResponse {
  success: boolean;
  message: string;
}

export const emailService = {
  /**
   * Sends the invitation image to the backend for emailing.
   */
  sendInvitation: async (email: string, guestName: string, imageBase64: string): Promise<EmailResponse> => {
    try {
      // Assuming backend runs on localhost:3001
      // In production, this URL would be an environment variable or relative path
      const response = await fetch('http://localhost:3001/api/send-invite', {
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
      return { success: false, message: "Failed to connect to email server. Make sure backend is running on port 3001." };
    }
  }
};
