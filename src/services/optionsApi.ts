interface Config {
  redDot: boolean;
  rotation: boolean;
  monopolize: boolean;
  openAfterClicked: boolean;
  dismissAfterClosed: boolean;
}

interface Common {
  id: string;
  name: string;
  type: number;
  priority: number;
  icon: string;
  title: string;
  openType: number;
  openData: string;
  data: string;
  config: Config;
  styles: number;
  startTime?: number;
  currentTime: number;
  disableFileNum: number | null;
}

interface ResponseData {
  code: number;
  result: string;
  data: {
    commons: Common[];
    office: Common[];
    recommends: Common[];
  };
}

export interface ExtractedData {
  id: string;
  name: string;
  title: string;
  icon: string;
}

export async function fetchCardData(): Promise<ExtractedData[]> {
  try {
    const response = await fetch('https://365.kdocs.cn/kdg/api/v1/cards/sub/18?scenes=select', {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        platform: 'web_pc',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin'
      },
      referrer: 'https://365.kdocs.cn/latest',
      referrerPolicy: 'unsafe-url',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ResponseData = await response.json();
    console.log(data);

    const extractData = (items: Common[]): ExtractedData[] => {
      return items.map((item) => ({
        id: item.id,
        name: item.name,
        title: item.title,
        icon: item.icon
      }));
    };

    const commonsData = extractData(data.data.commons);
    const officeData = extractData(data.data.office);
    const recommendsData = extractData(data.data.recommends);

    return [...commonsData, ...officeData, ...recommendsData];
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error;
  }
}
