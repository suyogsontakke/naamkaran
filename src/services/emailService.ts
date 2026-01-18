
export interface EmailResponse {
  success: boolean;
  message: string;
}

export const emailService = {
  /**
   * Sends the invitation image to the specified email.
   * NOTE: This requires a backend server running Nodemailer.
   * Since this is a frontend-only demo, we simulate the API call.
   */
  sendInvitation: async (email: string, guestName: string, imageBase64: string): Promise<EmailResponse> => {
    
    // --- SIMULATION START ---
    // In a real app, you would remove this timeout and uncomment the fetch below.
    return new Promise((resolve) => {
      console.log(`[Mock Backend] Sending email to ${email} for guest ${guestName}...`);
      // console.log(`[Mock Backend] Image data length: ${imageBase64.length}`);
      
      setTimeout(() => {
        resolve({ success: true, message: "Invitation sent successfully!" });
      }, 2000);
    });
    // --- SIMULATION END ---

    /* 
    // REAL BACKEND IMPLEMENTATION EXAMPLE:
    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          guestName,
          image: imageBase64 // The backend should convert this base64 to a buffer/attachment
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return await response.json();
    } catch (error) {
      console.error("Email service error:", error);
      return { success: false, message: "Failed to connect to email server." };
    }
    */
  }
};
