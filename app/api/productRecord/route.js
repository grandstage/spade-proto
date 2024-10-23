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
    const record = await base('Products').find(recordId); // fetch the record from airtable
    //console.log('Fetched record:', record); // Log the entire record object
    // map data from fields into an array
    const fields = {
        ProductName: record.fields['Product Name'],
        Company: record.fields['Company'],           
        ProductPage: record.fields['Product Page'],         
        ProductPageContent: record.fields['Product Page Content'],
        DocumentationUrl: record.fields['Documentation URL'],
        DocumentationContent: record.fields['Documentation Content'],
        Themes: record.fields['Themes'],
        Brief: record.fields['Brief'],
        Brief2: record.fields['Brief 2'],
    };
    // return array
    return new Response(JSON.stringify(fields), { status: 200 });
  } catch (error) {
    console.error('Error fetching record:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch record' }), { status: 500 });
  }
}