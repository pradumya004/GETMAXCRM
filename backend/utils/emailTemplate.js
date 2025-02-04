export const generateEmailTemplate = (employeeId, password) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Our Company</title>
  <style>
    body, p, h1, h2, div, span {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      line-height: 1.6;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; border: 0; border-spacing: 0; background: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with logo area -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%); border-radius: 8px 8px 0 0;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0; color: #ffffff;">
                <tr>
                  <td style="padding: 0; text-align: center;">
                    <img src="/api/placeholder/100/50" alt="Company Logo" style="height: 50px; margin-bottom: 20px;">
                    <h1 style="font-size: 28px; margin: 0; color: #ffffff;">Welcome to Our Company!</h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="padding: 40px 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                <tr>
                  <td style="padding: 0;">
                    <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #333333;">
                      We're thrilled to have you join our team! Your employee account has been created successfully. Please find your secure login credentials below.
                    </p>
                    
                    <!-- Credentials box -->
                    <div style="background-color: #f8f9fa; border-radius: 6px; padding: 30px; margin-bottom: 30px; border-left: 4px solid #1a237e;">
                      <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">EMPLOYEE ID</p>
                            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #1a237e;">${employeeId}</p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 10px 0;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">PASSWORD</p>
                            <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #1a237e;">${password}</p>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Important notice -->
                    <div style="background-color: #fff4e5; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                      <p style="margin: 0; color: #663c00; font-size: 14px;">
                        <strong>⚠️ Important:</strong> For security purposes, please change your password upon your first login.
                      </p>
                    </div>

                    <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #333333;">
                      If you have any questions or need assistance, please don't hesitate to reach out to our IT Support team.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background: #f8f9fa; border-radius: 0 0 8px 8px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; border: 0; border-spacing: 0;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #666666;">
                      Best regards,<br>
                      <strong style="color: #1a237e;">HR Department</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;