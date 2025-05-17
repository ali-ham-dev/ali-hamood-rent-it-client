import './HomePublic.scss';
import AssetCardPublic from '../../components/AssetCardPublic/AssetCardPublic';
import { Link } from 'react-router-dom';

const HomePublic = () => {
    return (
        <main>
            <div className='home-public'>
                <AssetCardPublic assetId={1} />
            </div>
        </main>
    )
}

export default HomePublic;