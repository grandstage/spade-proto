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
    const record = await base('Themes').find(recordId); // fetch the record from airtable
    //console.log('Fetched record:', record); // Log the entire record object
    // map data from fields into an array
    const fields = {
        Theme: record.fields['Theme'],
        RelatedProduct: record.fields['Related Product'],
        Description: record.fields['Description'],
        RevenueAugust: record.fields['Predicted Revenue - August'],           
        RevenueSeptember: record.fields['Predicted Revenue - September'],         
        RevenueOctober: record.fields['Predicted Revenue - October'],
        AcquisitionAugust: record.fields['Predicted Acquisition - August'],
        AcquisitionSeptember: record.fields['Predicted Acquisition - September'],
        AcquisitionOctober: record.fields['Predicted Acquisition - October'],
        RetentionAugust: record.fields['Predicted Retention - August'],
        RetentionSeptember: record.fields['Predicted Retention - September'],
        RetentionOctober: record.fields['Predicted Retention - October'],
        Feedback: record.fields['Feedback'],
    };

    return new Response(JSON.stringify(fields), { status: 200 });
  } catch (error) {
    console.error('Error fetching record:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch record' }), { status: 500 });
  }
}
