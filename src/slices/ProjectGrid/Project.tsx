import ImageReveal from '@/components/ImageReveal';
import { createClient } from '@/prismicio';
import { Content, isFilled } from '@prismicio/client';

async function getDominantColor(url:string) {
  const paletteUrl = new URL(url);
  paletteUrl.searchParams.set("palette","json");

  const res = await fetch(paletteUrl);
  const json = await res.json();

  return (
    json.average_luminance < .5 ? json.dominant_colors.muted_light?.hex : json.dominant_colors.muted?.hex
  );
}

type Props = {
  id: string;
}

export async function Project({id}: Props) {
  const client = createClient();
  const project = await client.getByID<Content.ProjectDocument>(id)

  const imageExists = isFilled.image(project.data.screenshot);
  const imgURL = String(project.data.screenshot.url);
  const dominantColor = imageExists ? await getDominantColor(imgURL) : "red";

  return (
    <a href="#projects" className=' project grid first:row-span-2 grid-cols-[1fr_min-content] grid-rows-[min-content_1fr] border-solid border-black border-2'>
      <h3 className='p-4 leading-5 border-b-2'>{project.data.title}</h3>
      <p className='p-4 leading-5 border-l-2 border-b-2 border-black'>{project.data.year}</p>
      <div className="p-4 self-center grid place-items-center col-span-2">
        {imageExists && <ImageReveal imgURL={imgURL} dominantColor={dominantColor} />}
        {/* <p>size</p> */}
      </div>
    </a>
  )
}