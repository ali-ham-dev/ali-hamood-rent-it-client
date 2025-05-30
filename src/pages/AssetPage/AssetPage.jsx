import './AssetPage.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Gallery from '../../components/Gallery/Gallery';
import Section from '../../components/Section/Section';

const apiUrl = import.meta.env.VITE_API_URL;
const assetsEp = import.meta.env.VITE_ASSETS_EP;

const AssetPage = () => {
    const { assetId } = useParams();
    const [asset, setAsset] = useState({});
    const [media, setMedia] = useState({});

    const renderAssetTitleBoxContent= () => {

    }

    const renderAssetDescription = () => {
        return (
            <p className='asset-page__description'>{asset.description}</p>
        )
    }

    const fetchAssetDetails = async () => {
        if (!assetId) {
            throw new Error('Invalid asset id');
        }

        const response = await axios.get(`${apiUrl}${assetsEp}/${assetId}`);
        if (response.status === 200) {
            setAsset(response.data.asset);
            setMedia([
                ...(response.data.media.images || []), 
                ...(response.data.media.videos || [])
            ]);
        }
    }

    useEffect( () => {
        const fetchAsset = async () => {
            try {
                await fetchAssetDetails();
            } catch (error) {
                console.error(`Error fetching asset with id: ${assetId}`, error);
            }
        }
        fetchAsset();
    }, [])

    return (
        <main className='asset-page'>
            <Gallery media={media} />
            <div className='asset-page__wrapper'>
                <Section title={asset.title} headingLevel='h2' content={renderAssetTitleBoxContent()} />
                <Section title='Asset Description' headingLevel='h3' content={renderAssetDescription()} />

                {/* TODO: user defined markdown? User defined forms?  */}
                <Section title='Asset Specifications' headingLevel='h3' content={
                    <table className='asset-page__table'> 
                        <thead className='asset-page__table-header'>
                            <tr className='asset-page__table-row'>
                            <th className='asset-page__table-header-cell'>Asset ID</th>
                            <th className='asset-page__table-header-cell'>Asset Title</th>
                            <th className='asset-page__table-header-cell'>Asset Description</th>
                        </tr>
                    </thead>
                    <tbody className='asset-page__table-body'>
                        <tr className='asset-page__table-row'>
                            <td className='asset-page__table-cell'>{asset.id}</td>
                            <td className='asset-page__table-cell'>{asset.title}</td>
                            <td className='asset-page__table-cell'>{asset.description}</td>
                        </tr>
                        </tbody>
                    </table>
                } />
                <Section title='Location' headingLevel='h3' content={''} />
            </div>
        </main>
    )
}
// TODO: Gallery, title, description, price, location, specifications {key value pairs}, embeded custom content. , rent process. -> questions and forms
// TODO: Active inactive?
export default AssetPage;




// const renderAssetDescription = () => (
//     <div>
//       {/* Your asset description here */}
//       <p>This is a great product located in San Francisco!</p>
//       <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
//         <iframe
//           width="100%"
//           height="100%"
//           frameBorder="0"
//           style={{ border: 0 }}
//           src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
//           allowFullScreen
//           aria-hidden="false"
//           tabIndex="0"
//           title="Product Location"
//         />
//       </div>
//     </div>
//   );