import { CgClose } from "react-icons/cg";
import { HiMenuAlt2 } from "react-icons/hi";
import { PiTextAaBold } from "react-icons/pi";
import { FiAtSign, FiImage, FiMic, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

type feedParams = {
  show: true;
  onClose: () => void;
};

const AddFeedModal = ({ show, onClose }: feedParams) => {
  return (
    <div
      className={`modal ${show ? "show" :""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-modal-title"
    >
      <div className="modal-wrap post-modal">
        <div className="modal_head">
          <h3>Poll Post</h3>
          <button className="close-btn"><CgClose size={22}/></button>
        </div>
        <div className="input-wrap">
          <div className="label-input textarea one">
            <textarea
              rows={4}
              placeholder="Compose new post..."
              name="Compose new post..."
            />
          </div>
          <span className="right">0/300</span>
        </div>
        <div className="select_wrap">
          <label className="radio_wrap">
            <input type="radio" name="access" /> Only for Subscribers
          </label>
          <label className="radio_wrap">
            <input type="radio" name="access" /> Pay per View
          </label>
          <label className="radio_wrap">
            <input type="radio" name="access" checked /> Free for Everyone
          </label>
        </div>
        <div className="">
          <label>Price</label>
          <input
            className="form-input"
            type="text"
            placeholder="10.99 *"
            name="firstName"
          />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <label>Schedule?</label>
            <div className="toggleGroup">
              <input
                type="checkbox"
                id="on-off-switch"
                className="checkbox"
                defaultChecked
              />
              <label htmlFor="on-off-switch" className="label"></label>
              <div className="onoffswitch" aria-hidden="true">
                <div className="onoffswitchLabel">
                  {" "}
                  <div className="onoffswitchInner"></div>{" "}
                  <div className="onoffswitchSwitch"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mw-fit w-full">
            <label>Schedule at</label>
            <input
              className="form-input"
              type="date"
              placeholder="10.99 *"
              name="firstName"
            />
          </div>
        </div>
        {/* <div className="upload-wrapper">
            <div className="img_wrap">
              <svg className="icons idshape size-45"></svg>
              <div className="imgicons"><TbCamera size="16" /></div>
            </div>
            <button className="btn-primary active-down-effect"><div className="imgicons"><TbCamera size="16" /></div><span>Add thumbnail</span></button>
          </div> */}
        {/* <div className="flex items-center gap-10">
            <button className="btn-grey btnicons gap-10"><div className="imgicons"><FiVideo size="16" /></div><span>Start recording</span></button>
            <button className="btn-grey btnicons gap-10"><div className="imgicons"><MdUpload size="16" /></div><span>Upload video</span></button>
          </div>
          <div className="upload-wrapper">
            <button className="btn-primary active-down-effect"><div className="imgicons"><TbCamera size="16" /></div><span>Add thumbnail</span></button>
          </div> */}
        {/* <div className="duration_wraping">
           <div className="">
            <label className="orange">Poll Duration - 7 days</label>
            <input className="form-input" type="text" placeholder="Question" name="firstName" disabled/>
           </div>
            <label className="pollanw selected">Poll Duration - 7 days</label>
            <label className="pollanw">Poll Duration - 7 days</label>
            <Link href="#" className="clear">Clear Polls</Link>
          </div> */}
        <div className="actions">
          <button className="cate-back-btn active-down-effect btn_icons">
            <FiImage size={20} />
          </button>
          <button className="cate-back-btn active-down-effect btn_icons">
            <FiVideo size={20} />
          </button>
          <button className="cate-back-btn active-down-effect btn_icons">
            <PiTextAaBold size={20} />
          </button>
          <button className="cate-back-btn active-down-effect btn_icons">
            <FiMic size={20} />
          </button>
          <button className="cate-back-btn active-down-effect btn_icons">
            <HiMenuAlt2 size={20} />
          </button>
          <button className="cate-back-btn active-down-effect btn_icons">
            <FiAtSign size={20} />
          </button>
          <div className="right">
            <button className="cate-back-btn active-down-effect btn_icons">
              <FaXTwitter size={20} />
            </button>
            <button className="premium-btn active-down-effect">
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFeedModal;
