import './AssetPagePublic.scss';
import { useParams } from 'react-router-dom';

const AssetPagePublic = () => {
    const { assetId } = useParams();
    return (
        <main className='asset-page-public'>
            <p className='asset-page-public__text'>Asset Page</p>
        </main>
    )
}

export default AssetPagePublic;
