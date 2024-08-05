import {useEffect, useState} from 'react';
import {Button, Dropdown, Radio} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {setFetchFilesParams} from '../../slices/fetchFilesSlice';
import {FileTypeSelect} from './select/FileTypeSelect';
import {TimeSelect} from './select/TimeSelect';
import {ScopeSelect} from './select/ScopeSelect';
import {CreatorSelect} from './select/CreatorSelect';
import styles from '../../styles/ButtonInput.module.scss';

const checkedIcon = `<svg style="float: left" width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke-width="1.5">
  <g id="group-0" stroke="currentColor" fill="currentColor">
    <path d="M2.5 7.38775L6.68824 11.2933C6.81053 11.401 6.99639 11.3913 7.10689 11.2716L13.4215 4.5" stroke-linecap="round" stroke-linejoin="miter" fill="none" vector-effect="non-scaling-stroke"></path>
  </g>
</svg>`;

const ButtonInput = () => {
  const params = useSelector((state: RootState) => state.fetchFiles);
  const dispatch: AppDispatch = useDispatch();
  const [position, setPosition] = useState('search_file_name');
  const [selectedTypesVisible, setSelectedTypesVisible] = useState(false);
  const [selectedCreatorVisible, setSelectedCreatorVisible] = useState(false);
  const [selectedCreatorText, setSelectedCreatorText] = useState('');
  const [selectedTimesVisible, setSelectedTimesVisible] = useState(false);
  const [selectedScopeVisible, setSelectedScopeVisible] = useState(false);
  console.log(selectedCreatorText);

  useEffect(() => {
    if (position === 'search_file_name') {
      dispatch(setFetchFilesParams({search_file_name: true, search_file_content: false}));
    } else {
      dispatch(setFetchFilesParams({search_file_name: false, search_file_content: true}));
    }
  }, [position]);

  return (
    <div className={styles.buttonInputContainer}>
      <div className={styles.radioGroupContainer}>
        <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)} size="small">
          <Radio.Button value="search_file_name">文件名</Radio.Button>
          <Radio.Button value="search_file_content">正文</Radio.Button>
        </Radio.Group>
      </div>
      <div className={styles.dropdownContainer}>
        <Dropdown
          trigger={['click']}
          open={selectedTypesVisible}
          onOpenChange={setSelectedTypesVisible}
          placement="bottomLeft"
          dropdownRender={() => <FileTypeSelect checkedIcon={checkedIcon} />}
        >
          <Button
            className={`${selectedTypesVisible ? styles.antDropdownOpen : ''}`}
            size="small"
            disabled={params.search_file_content && params.searchname == ''}
          >
            类型
          </Button>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          open={selectedCreatorVisible}
          onOpenChange={setSelectedCreatorVisible}
          placement="bottomLeft"
          dropdownRender={() => (
            <CreatorSelect
              checkedIcon={checkedIcon}
              setSelectedCreatorVisible={setSelectedCreatorVisible}
              setSelectedCreatorText={setSelectedCreatorText}
            />
          )}
        >
          <Button
            className={`${selectedCreatorVisible ? styles.antDropdownOpen : ''}`}
            size="small"
            disabled={params.search_file_content && params.searchname == ''}
          >
            创建者
          </Button>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          open={selectedTimesVisible}
          onOpenChange={setSelectedTimesVisible}
          placement="bottomLeft"
          dropdownRender={() => (
            <TimeSelect checkedIcon={checkedIcon} setSelectedTimesVisible={setSelectedTimesVisible} />
          )}
        >
          <Button
            className={`${selectedTimesVisible ? styles.antDropdownOpen : ''}`}
            size="small"
            disabled={params.search_file_content && params.searchname == ''}
          >
            时间
          </Button>
        </Dropdown>
        <Dropdown
          trigger={['click']}
          open={selectedScopeVisible}
          onOpenChange={setSelectedScopeVisible}
          placement="bottomLeft"
          dropdownRender={() => (
            <ScopeSelect checkedIcon={checkedIcon} setSelectedScopeVisible={setSelectedScopeVisible} />
          )}
        >
          <Button
            className={`${selectedScopeVisible ? styles.antDropdownOpen : ''}`}
            size="small"
            disabled={params.search_file_content && params.searchname == ''}
          >
            位置
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default ButtonInput;
