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
import {CustomedTime} from './select/CustomedTime';
import {fileTypedata} from '../../assets/fileTypeData';
import DropdownSelectDataType from '../../types/SelectDataType';

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
  const [customedTimeVisible, setCustomedTimeVisible] = useState(false);
  const [selectedScopeVisible, setSelectedScopeVisible] = useState(false);
  const [typeButtonValue, setTypeButtonValue] = useState<DropdownSelectDataType>({
    title: '类型',
    name: ''
  });
  console.log(selectedCreatorText);

  function stringToArray(input: string): string[] {
    return input.split(',').map((item) => item.trim());
  }
  function findTypeChineseName(input: string): DropdownSelectDataType {
    for (const item of fileTypedata) {
      if (item.name == input) {
        return item;
      }
    }
    return fileTypedata[0];
  }
  useEffect(() => {
    if (params.include_ext_groups == undefined) {
      setTypeButtonValue({
        title: '类型',
        name: ''
      });
    } else {
      const ext_arr = stringToArray(params.include_ext_groups);
      if (ext_arr.length == 1) {
        const itemType = findTypeChineseName(ext_arr[0]);
        setTypeButtonValue(itemType);
      } else {
        setTypeButtonValue({
          title: `文件类型${ext_arr.length}`,
          name: ''
        });
      }
    }
  }, [params.include_ext_groups]);

  useEffect(() => {
    console.log('开始button联动', params);
  }, [params.filter_user_id]);
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
            {typeButtonValue.icon ? (
              <div className={styles.icon} dangerouslySetInnerHTML={{__html: typeButtonValue.icon}} />
            ) : (
              ''
            )}
            {typeButtonValue.title}
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
          onOpenChange={value => {setSelectedTimesVisible(value);setCustomedTimeVisible(false);}}
          placement="bottomLeft"
          dropdownRender={() => {
            if (!customedTimeVisible) {
              return (
                <TimeSelect
                  checkedIcon={checkedIcon}
                  setSelectedTimesVisible={setSelectedTimesVisible}
                  setCustomedTimeVisible={setCustomedTimeVisible}
                />
              );
            } else {
              return <CustomedTime checkedIcon={checkedIcon} setSelectedTimesVisible={setCustomedTimeVisible} />;
            }
          }}
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
