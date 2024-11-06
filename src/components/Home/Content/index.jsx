import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

function Content() {
  return (
    <div className={cx("home-content")}>
      <div className={cx("story-list")}>
        {/* Tạo story mới */}
        <div
          className={cx("story-item", "create-story")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("create-story-placeholder")}>
              <div className={cx("add-icon")}>
                <span>+</span>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Tạo tin</span>
            </div>
          </div>
        </div>

        <div
          className={cx("story-item")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("story-header")}>
              <div className={cx("avatar-wrapper")}>
                <div className={cx("avatar")}></div>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Kim Chi</span>
            </div>
          </div>
        </div>

        <div
          className={cx("story-item")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("story-header")}>
              <div className={cx("avatar-wrapper")}>
                <div className={cx("avatar")}></div>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Hà Thu</span>
            </div>
          </div>
        </div>

        <div
          className={cx("story-item")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("story-header")}>
              <div className={cx("avatar-wrapper")}>
                <div className={cx("avatar")}></div>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Dương Thị Hường Trà</span>
            </div>
          </div>
        </div>

        <div
          className={cx("story-item")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("story-header")}>
              <div className={cx("avatar-wrapper")}>
                <div className={cx("avatar")}></div>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Nguyễn Minh Phương</span>
            </div>
          </div>
        </div>

        <div
          className={cx("story-item")}
          style={{ width: "140px", height: "250px", margin: "0 4px" }}
        >
          <div className={cx("story-card")}>
            <div className={cx("story-header")}>
              <div className={cx("avatar-wrapper")}>
                <div className={cx("avatar")}></div>
              </div>
            </div>
            <div className={cx("story-footer")}>
              <span className={cx("story-text")}>Phạm Hoàng Anh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
