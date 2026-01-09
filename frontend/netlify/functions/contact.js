export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  try {
    const data = JSON.parse(event.body)

    console.log('Contact Request:', data)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Request sent successfully',
      }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Server error',
      }),
    }
  }
}
