const fileTypeMapping = {
  img: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'heic',
    'webp',
    'tif',
    'fax',
    'lcb',
    'jff',
    'jfif',
    'jif',
    'jpe',
    'jtp',
    'lbm',
    'pbm',
    'tiff',
    'vst',
    'vda',
    'pcx',
    'wmf',
    'emf',
    'svg'
  ],
  zip: ['zip', '7z', 'rar', 'iso'],
  doc: ['wps', 'wpt', 'doc', 'docx', 'dot', 'rtf', 'xml', 'docm', 'dotm', 'wdoc'],
  xls: [
    'et',
    'ett',
    'xls',
    'xlsx',
    'xlsm',
    'xlsb',
    'xlam',
    'xltx',
    'xltm',
    'xls',
    'xlt',
    'xla',
    'xlw',
    'odc',
    'uxdc',
    'dbf',
    'prn',
    'wxls',
    'csv'
  ],
  ppt: ['dps', 'dpt', 'pptx', 'ppt', 'pptm', 'ppsx', 'pps', 'ppsm', 'potx', 'pot', 'potm', 'wpd', 'wppt'],
  txt: ['txt', 'text'],
  pdf: ['pdf'],
  pom: ['pom'],
  pof: ['pof'],
  h5: ['h5'],
  note: ['wpsnote'],
  form: ['form'],
  audio: [
    'aac',
    'ac3',
    'amr',
    'ape',
    'cda',
    'dts',
    'flac',
    'm1a',
    'm2a',
    'm4a',
    'mid',
    'midi',
    'mka',
    'mp2',
    'mp3',
    'mpa',
    'ogg',
    'ra',
    'tak',
    'tta',
    'wav',
    'wma',
    'wv',
    'aif',
    'au',
    'ram'
  ],
  video: [
    'asf',
    'avi',
    'wm',
    'wmp',
    'wmv',
    'rm',
    'rmvb',
    'rp',
    'rpm',
    'rt',
    'smi',
    'smil',
    'dat',
    'm1v',
    'm2p',
    'm2t',
    'm2ts',
    'm2v',
    'mp2v',
    'mpe',
    'mpeg',
    'mpg',
    'mpv2',
    'pss',
    'pva',
    'tp',
    'tpr',
    'ts',
    'm4b',
    'm4p',
    'm4v',
    'mp4',
    'mpeg4',
    '3g2',
    '3gp',
    '3gp2',
    '3gpp',
    'mov',
    'qt',
    'f4v',
    'flv',
    'hlv',
    'swf',
    'ifo',
    'vob',
    'amv',
    'bik',
    'csf',
    'divx',
    'evo',
    'ivm',
    'mkv',
    'mod',
    'mts',
    'ogm',
    'pmp',
    'scm',
    'tod',
    'vp6',
    'webm',
    'xlmv'
  ],
  otl: ['otl'],
  motl: ['motl'],
  kw: ['kw'],
  ckt: ['ckt'],
  dbt: ['dbt'],
  ksheet: ['ksheet'],
  ofd: ['ofd'],
  resh: ['resh'],
  uof: ['uof', 'uot3', 'uott3'],
  cad2d: ['dxf', 'dwg', 'dgn', 'exb'],
  cad3d: [
    'par',
    'asm',
    /\.asm\.\d+$/i,
    'psm',
    'sldprt',
    'sldasm',
    'ipt',
    'iam',
    'prt',
    /\.prt\.\d+$/i,
    'catpart',
    'catproduct',
    'cgr',
    'model',
    'exp',
    'session',
    'x_t',
    'xmt_txt',
    'x_b',
    'xmt_bin',
    'p_b',
    'xmp_bin',
    'p_t',
    'xmp_txt',
    'sat',
    'sab',
    'asat',
    'asab',
    'igs',
    'iges',
    'stp',
    'step',
    'stpz',
    'stpx',
    'jt',
    'xcgm',
    '3dm',
    '3dxml',
    'stl',
    'obj',
    '3mf',
    'vda',
    'rvt',
    'rfa'
  ]
};

const getFileType = (extension: string): string | null => {
  for (const [type, extensions] of Object.entries(fileTypeMapping)) {
    if (extensions.some((ext) => (ext instanceof RegExp ? ext.test(extension) : ext === extension))) {
      return type;
    }
  }
  return null;
};

// 示例用法:
const fileExtension = 'docx';
const fileType = getFileType(fileExtension);
console.log(fileType); // 输出: doc

export interface DataType {
  id?: string;
  name?: string;
  icon: string;
  title: string;
}

export const fileTypedata: DataType[] = [
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke-width="1.5">
                 <g id="group-0" stroke="currentColor" fill="currentColor">
                   <path d="M2.5 7.38775L6.68824 11.2933C6.81053 11.401 6.99639 11.3913 7.10689 11.2716L13.4215 4.5" stroke-linecap="round" stroke-linejoin="miter" fill="none" vector-effect="non-scaling-stroke"></path>
                 </g>
               </svg>`,
    title: '不限类型'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#9147F0"></path>
                 <path d="M0 14H16C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#7C33DE"></path>
                 <path d="M8 14H16C16 15.1046 15.1046 16 14 16H8V14Z" fill="#A761FF"></path>
                 <path d="M12 3V4.5L4 4.5V3H12Z" fill="white"></path>
                 <path d="M12 6V7.5L4 7.5V6L12 6Z" fill="white"></path>
                 <path d="M9 10.5V9L4 9V10.5H9Z" fill="white"></path>
               </svg>`,
    title: '智能文档'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#109968"></path>
                 <path d="M0 14H16V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#007D53"></path>
                 <path d="M8 14H16V14C16 15.1046 15.1046 16 14 16H8V14Z" fill="#38B27F"></path>
                 <path d="M5.43487 3.49866C5.9385 2.8772 6.77045 2.45471 8.00818 2.45471C9.72392 2.45471 10.9251 3.58939 11.2599 5.00159H9.68574C9.41077 4.38497 8.81481 3.95471 8.00818 3.95471C7.13634 3.95471 6.76875 4.23514 6.60024 4.44307C6.40493 4.68408 6.35911 4.97551 6.35911 5.11647C6.35911 5.32711 6.46576 5.52108 6.85014 5.74408C7.17982 5.93534 7.56862 6.06377 7.9728 6.19728C8.0646 6.2276 8.15719 6.25818 8.25006 6.28983C8.33508 6.3188 8.44441 6.35209 8.57014 6.39039C8.98994 6.51824 9.5927 6.70182 10.0848 6.96603C10.7706 7.33428 11.4979 7.98475 11.4979 9.10811C11.4979 9.86491 11.0089 10.485 10.4639 10.8767C9.89874 11.2829 9.14795 11.5448 8.35508 11.5448C7.43823 11.5448 6.52745 11.3521 5.81983 10.9003C5.16318 10.481 4.69172 9.83869 4.59692 9.00159H6.1204C6.1932 9.26096 6.36268 9.46719 6.62703 9.63597C7.01972 9.88669 7.62179 10.0448 8.35508 10.0448C8.82796 10.0448 9.27358 9.88499 9.5884 9.6587C9.92339 9.41791 9.99789 9.19465 9.99789 9.10811C9.99789 8.77269 9.82456 8.52886 9.37519 8.28757C9.02601 8.10009 8.65312 7.98629 8.26411 7.86758C8.10083 7.81775 7.9347 7.76705 7.7663 7.70968C7.70336 7.68823 7.63227 7.66498 7.55491 7.63968C7.15143 7.5077 6.57713 7.31984 6.09743 7.04155C5.50551 6.69815 4.85911 6.10261 4.85911 5.11647C4.85911 4.7515 4.95804 4.08705 5.43487 3.49866Z" fill="white"></path>
               </svg>`,
    title: '表格'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#009BAF"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14L16 14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#007F8F"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#2EB1C5"></path>
                 <path d="M12 3H8.75L7.25 5.5H3.99507V7H8L9.5 4.5H10.5V9.5H5.49219V8H3.99219V11H12V3Z" fill="white"></path>
                 <path d="M4 4.5V4.4865L5 3H7.5L6.48987 4.5H4Z" fill="white"></path>
               </svg>`,
    title: '智能表单'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#3B64FC"></path>
                 <path d="M0 14H16V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#1050E7"></path>
                 <path d="M8 14H16V14C16 15.1046 15.1046 16 14 16H8V14Z" fill="#5589FF"></path>
                 <path d="M3.34155 3H4.87702L5.88772 7.62035L7.21212 3.5H8.7877L10.1121 7.62035L11.1228 3H12.6583L10.9083 11H9.62284L7.99991 5.95091L6.37699 11H5.09155L3.34155 3Z" fill="white"></path>
               </svg>`,
    title: '文字'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#DF4023"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14L16 14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#C82912"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#F85836"></path>
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5V11H6V8H9.25C10.7688 8 12 6.76878 12 5.25C12 3.73122 10.7688 2.5 9.25 2.5H4.5ZM6 6.5H9.25C9.94036 6.5 10.5 5.94036 10.5 5.25C10.5 4.55964 9.94036 4 9.25 4H6V6.5Z" fill="white"></path>
               </svg>`,
    title: '演示'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#DE325B"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14L16 14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#C9134B"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#FB4F6D"></path>
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M7 2.5H10.25C11.7688 2.5 13 3.73122 13 5.25C13 6.76878 11.7688 8 10.25 8H8.5V11H5.5C4.25736 11 3.25 9.99264 3.25 8.75C3.25 7.50736 4.25736 6.5 5.5 6.5H7V2.5ZM8.5 6.5H10.25C10.9404 6.5 11.5 5.94036 11.5 5.25C11.5 4.55964 10.9404 4 10.25 4H8.5V6.5ZM7 8H5.5C5.08579 8 4.75 8.33579 4.75 8.75C4.75 9.16421 5.08579 9.5 5.5 9.5H7V8Z" fill="white"></path>
               </svg>`,
    title: 'PDF'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#6D5AFA"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14L16 14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#5C49E6"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#8675FF"></path>
                 <path d="M11.9999 3C11.9999 3.55228 11.5522 4 10.9999 4C10.4476 4 9.99993 3.55228 9.99993 3C9.99993 2.44772 10.4476 2 10.9999 2C11.5522 2 11.9999 2.44772 11.9999 3Z" fill="white"></path>
                 <path d="M6.57873 4.50001L8.81931 7.84658L10.3933 5.64314L13.316 10.4961H11.565L10.2865 8.37325L8.77935 10.4831L6.59382 7.21874L4.45186 10.4961H2.65991L6.57873 4.50001Z" fill="white"></path>
               </svg>`,
    title: '图片'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#009E8C"></path>
                 <path d="M0 14H16C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#008575"></path>
                 <path d="M8 14H16C16 15.1046 15.1046 16 14 16H8V14Z" fill="#00B8A2"></path>
                 <path d="M5.73536 3L1.5 4.37624L3.04665 6.31687L7.28201 4.94063L8.82866 6.88126L13.064 5.50502L11.5174 3.56439L7.28201 4.94063L5.73536 3Z" fill="white"></path>
                 <path d="M7.17134 7.41979L2.93598 8.79602L4.48263 10.7367L8.71799 9.36041L10.2646 11.301L14.5 9.9248L12.9534 7.98417L8.71799 9.36041L7.17134 7.41979Z" fill="white"></path>
               </svg>`,
    title: '多维表格'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#009BAF"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14V14L16 14V14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#007F8F"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#2EB1C5"></path>
                 <path d="M10.75 5.00234H9V6.25H12V2.75H7.5L6.5 4H10.75V5.00234Z" fill="white"></path>
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.00234V9.00234H8V5.00234H3ZM6.75 6.25H4.25V7.75H6.75V6.25Z" fill="white"></path>
                 <path d="M10.75 9.00234H9V7.75H12V11.25H7.5L6.5 10H10.75V9.00234Z" fill="white"></path>
               </svg>`,
    title: '思维导图'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#1885DE"></path>
                 <path d="M2 16C0.895431 16 0 15.1046 0 14L16 14C16 15.1046 15.1046 16 14 16L2 16Z" fill="#0070CC"></path>
                 <path d="M8 16L8 14L16 14C16 15.1046 15.1046 16 14 16L8 16Z" fill="#40A9FF"></path>
                 <path d="M6.46912 1.79297L2.82812 5.47983L4.81748 7.49331L5.88451 6.43907L4.93653 5.47959L6.46914 3.92768L8.18726 5.66742L4.36836 9.5344L6.34114 11.532H11.3636L13.3364 9.53439L11.0556 7.2249H10.4474L8.94744 8.7249H10.4288L11.2282 9.53439L10.7368 10.032H6.96796L6.47654 9.53439L10.2954 5.66741L6.46912 1.79297Z" fill="white"></path>
                 <path d="M8.81073 7.26786L8.85369 7.2249H8.81073V7.26786Z" fill="white"></path>
               </svg>`,
    title: '流程图'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2Z" fill="#E8B600"></path>
                 <path d="M0 14H16C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14Z" fill="#DBAC00"></path>
                 <path d="M8 14H16C16 15.1046 15.1046 16 14 16H8V14Z" fill="#F7C200"></path>
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M5.90572 10.3089C5.86816 10.3119 5.83094 10.3147 5.79407 10.3173C5.68538 10.325 5.57977 10.3309 5.47743 10.336L4.76314 11.0805C4.5832 11.2836 4.32219 11.4003 4.04768 11.4003L2.5 11.4476L4.43277 9.71842C4.43774 9.6168 4.44478 9.50885 4.45469 9.39539C4.45577 9.38299 4.45689 9.37052 4.45804 9.35799C4.46228 9.31186 4.467 9.26485 4.47225 9.21703C4.58986 8.14542 4.97298 6.66068 6.19698 5.36692C7.47901 4.01183 9.48367 3.30674 10.8958 2.91676C10.9254 2.90859 10.9547 2.90056 10.9838 2.89267L11.0174 2.88356C11.1969 2.83516 11.3651 2.79278 11.5191 2.75598C12.116 2.61338 12.5 2.55469 12.5 2.55469C12.5 2.55469 12.4388 2.93902 12.2899 3.53467C12.2514 3.68856 12.2071 3.85657 12.1564 4.03569L12.1551 4.04041C12.1443 4.07859 12.1332 4.11727 12.1218 4.15642C11.7195 5.54011 10.9539 7.51597 9.63001 8.81321C8.24424 9.96548 6.94357 10.2254 5.90572 10.3089ZM8.62287 7.69944C7.68541 8.46301 6.82741 8.69795 6.05753 8.78731C6.21771 8.02807 6.56078 7.16499 7.28661 6.3978C8.05756 5.58291 9.24367 5.02607 10.3878 4.6397C9.99227 5.73264 9.41445 6.90279 8.62287 7.69944Z" fill="white"></path>
               </svg>`,
    title: '便签'
  },
  {
    icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 13.5C0.671573 13.5 0 12.8284 0 12L0 1.5C0 0.671573 0.671573 0 1.5 0L4.5 0C4.82456 0 5.14036 0.105267 5.4 0.3L6.6 1.2C6.85964 1.39473 7.17544 1.5 7.5 1.5L14.5 1.5C15.3284 1.5 16 2.17157 16 3L16 12C16 12.8284 15.3284 13.5 14.5 13.5L1.5 13.5Z" fill="#0065DC"></path>
                 <path d="M1.5 15C0.671573 15 0 14.3284 0 13.5L0 4.5C0 3.67157 0.671573 3 1.5 3L14.5 3C15.3284 3 16 3.67157 16 4.5L16 13.5C16 14.3284 15.3284 15 14.5 15L1.5 15Z" fill="#1983FF"></path>
               </svg>`,
    title: '文件夹'
  }
];
export const processedData = fileTypedata.map((item, index) => ({
  key: index.toString(),
  name: `${item.icon} ${item.title}`
}));