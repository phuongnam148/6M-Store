import { useEffect } from 'react';
import { Modal } from 'antd';

const OpenModal = (props: any) => {
  const { configs } = props;
  const config = {
    title: configs?.title || 'Xác nhận',
    content: (
      <>{configs?.content || 'Bạn có chắc muốn thực hiện hành động này'} </>
    ),
    onOk() {
      if (configs?.onOk) {
        configs?.onOk();
      }
    },
    onCancel() {
      if (configs.onCancel) {
        configs.onCancel();
      }
    },
  };

  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    if (props?.configs?.action) {
      switch (props?.configs?.action) {
        case 'confirm': {
          modal.confirm(config);
          break;
        }
        case 'warning': {
          modal.warning(config);
          break;
        }
        case 'info': {
          modal.info(config);
          break;
        }
        case 'error': {
          modal.error(config);
          break;
        }
      }
    }
  }, [props]);

  return <>{contextHolder}</>;
};

export default OpenModal;
