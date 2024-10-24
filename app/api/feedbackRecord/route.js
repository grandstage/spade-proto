import Airtable from 'airtable';

//set the airtable base and api key using env variables
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get('recordId'); // Get the recordId from query params

  if (!recordId) {
    return new Response(JSON.stringify({ error: 'Record ID is required' }), { status: 400 });
  }

  try {
    const record = await base('Brief').find(recordId); // fetch the record from airtable
    //console.log('Fetched record:', record); // Log the entire record object
    // map data from fields into an array
    const fields = {
        Title: record.fields['Title'],
        RelatedBrief: record.fields['Related Brief'],           
        Feedback: record.fields['Feedback'],         
        Sentiment: record.fields['Sentiment'],
        Priority: record.fields['Priority'],
        Theme: record.fields['Theme'],
    };
    // return array
    return new Response(JSON.stringify(fields), { status: 200 });
  } catch (error) {
    console.error('Error fetching record:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch record' }), { status: 500 });
  }
}