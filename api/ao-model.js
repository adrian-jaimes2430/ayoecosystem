const DRIVE_URL='https://drive.usercontent.google.com/download?id=1-jzHuDPHk3KjTRzXJFQMZxBSEtTIF1cw&export=download&confirm=t';

export default async function handler(req,res){
  if(req.method==='OPTIONS'){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Range,Content-Type');
    return res.status(204).end();
  }
  try{
    const headers={};
    if(req.headers.range) headers.Range=req.headers.range;
    const upstream=await fetch(DRIVE_URL,{headers,redirect:'follow'});
    if(!upstream.ok && upstream.status!==206) return res.status(upstream.status).end();
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Content-Type','model/gltf-binary');
    res.setHeader('Cache-Control','public, max-age=86400, s-maxage=31536000, immutable');
    const len=upstream.headers.get('content-length'); if(len) res.setHeader('Content-Length',len);
    const range=upstream.headers.get('content-range'); if(range) res.setHeader('Content-Range',range);
    res.status(upstream.status);
    if(!upstream.body) return res.end();
    const reader=upstream.body.getReader();
    while(true){const {done,value}=await reader.read();if(done)break;res.write(Buffer.from(value));}
    res.end();
  }catch(e){res.status(502).json({error:'A&O model proxy failed'});}
}
