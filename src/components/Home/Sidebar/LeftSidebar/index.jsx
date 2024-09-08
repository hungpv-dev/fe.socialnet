import classNames from "classnames/bind";
import styles from "./LeftSidebar.module.scss";
import Button from "./Button";
import React, { useState } from "react";

const cx = classNames.bind(styles);

function LeftSidebar() {
    const [showMore1, setShowMore1] = useState(false);
    const [showMore2, setShowMore2] = useState(false);

    const toggleShowMore1 = () => {
        setShowMore1(!showMore1);
    };

    const toggleShowMore2 = () => {
        setShowMore2(!showMore2);
    };

    return (
        <aside className={cx('left-sidebar')}>
            <Button icon={<i className="bi bi-house"></i>} name="Home" />
            <Button icon={<i className="bi bi-house"></i>} name="Home" />
            <Button icon={<i className="bi bi-house"></i>} name="Home" />
            <Button icon={<i className="bi bi-house"></i>} name="Home" />

            {showMore1 && (
                <>
                    <Button icon={<i className="bi bi-house"></i>} name="Home" />
                    <Button icon={<i className="bi bi-house"></i>} name="Home" />
                </>
            )}

            <button style={{ width: '100%' }} onClick={toggleShowMore1}>
                {showMore1 ?
                    <Button icon={<i className="bi bi-chevron-up"></i>} name="Ẩn bớt" /> :
                    <Button icon={<i className="bi bi-chevron-down"></i>} name="Xem thêm" />
                }
            </button>

            <hr />

            <Button
                icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                    alt="Home Icon"
                    style={{ width: '100%', height: '100%' }}
                />}
                name="Home Home Home Home Home Home Home Home Home Home Home Home Home Home Home Home Home Home "
            />
            <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                alt="Home Icon"
                style={{ width: '100%', height: '100%' }}
            />} name="Home" />
            <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                alt="Home Icon"
                style={{ width: '100%', height: '100%' }}
            />} name="Home" />
            <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                alt="Home Icon"
                style={{ width: '100%', height: '100%' }}
            />} name="Home" />

            {showMore2 && (
                <>
                    <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                        alt="Home Icon"
                        style={{ width: '100%', height: '100%' }}
                    />} name="Home" />
                    <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                        alt="Home Icon"
                        style={{ width: '100%', height: '100%' }}
                    />} name="Home" />
                    <Button icon={<img src="https://scontent.fhan14-5.fna.fbcdn.net/v/t1.6435-9/147704613_2900662533513496_6842664885140534980_n.jpg?stp=c160.0.956.956a_cp0_dst-jpg_s75x225&_nc_cat=109&ccb=1-7&_nc_sid=f752f3&_nc_eui2=AeFj1WMjyp6DdtJ7GGyQjcJWvmfQeLjU8c2-Z9B4uNTxzZkvpyCAZf9kuYy_R-y-DjkDSRpmT_K4jFHC-Qm9bUbw&_nc_ohc=36Uf0nVPaCUQ7kNvgGZ-FEr&_nc_ht=scontent.fhan14-5.fna&_nc_gid=Aqjx5WwyB0pCqj46uNyCKUk&oh=00_AYA-jH_E-dOdDUHL-9UyJMN5fnDyElXjskefYA1FjXFlDA&oe=670486C8"
                        alt="Home Icon"
                        style={{ width: '100%', height: '100%' }}
                    />} name="Home" />
                </>
            )}

            <button style={{ width: '100%' }} onClick={toggleShowMore2}>
                {showMore2 ?
                    <Button icon={<i className="bi bi-chevron-up"></i>} name="Ẩn bớt" /> :
                    <Button icon={<i className="bi bi-chevron-down"></i>} name="Xem thêm" />
                }
            </button>
        </aside>
    );
}

export default LeftSidebar;
