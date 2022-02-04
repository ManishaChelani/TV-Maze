import modelFunction from '../../src/genericMethods/modelFunction.ts'
import { PROPERTIES }  from '../../src/assets/resources/properties'

let model=new modelFunction();
let mockStorage = {}
beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value
  })
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key])
})

beforeEach(() => {
  mockStorage = {}
})

afterAll(() => {
	global.Storage.prototype.setItem.mockReset()
  global.Storage.prototype.getItem.mockReset()
})

describe('getAllShows',()=>{
  let allShows=[{"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"English","genres":["Science-Fiction"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2013-06-24","ended":"2015-09-10","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"22:00","days":["Thursday"]},"rating":{"average":6.5},"weight":98,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","updated":1631010933,"_links":{"self":{"href":"https://api.tvmaze.com/shows/1"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/185054"}}},{"id":2,"url":"https://www.tvmaze.com/shows/2/person-of-interest","name":"Person of Interest","type":"Scripted","language":"English","genres":["Action","Crime","Science-Fiction"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2011-09-22","ended":"2016-06-21","officialSite":"http://www.cbs.com/shows/person_of_interest/","schedule":{"time":"22:00","days":["Tuesday"]},"rating":{"average":8.9},"weight":98,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":28376,"thetvdb":248742,"imdb":"tt1839578"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg"},"summary":"<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \"irrelevant\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>","updated":1631565378,"_links":{"self":{"href":"https://api.tvmaze.com/shows/2"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/659372"}}},{"id":3,"url":"https://www.tvmaze.com/shows/3/bitten","name":"Bitten","type":"Scripted","language":"English","genres":["Drama","Horror","Romance"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2014-01-11","ended":"2016-04-15","officialSite":"http://bitten.space.ca/","schedule":{"time":"22:00","days":["Friday"]},"rating":{"average":8.9},"weight":96,"network":{"id":7,"name":"CTV Sci-Fi Channel","country":{"name":"Canada","code":"CA","timezone":"America/Halifax"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":34965,"thetvdb":269550,"imdb":"tt2365946"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/0/15.jpg"},"summary":"<p>Based on the critically acclaimed series of novels from Kelley Armstrong. Set in Toronto and upper New York State, <b>Bitten</b> follows the adventures of 28-year-old Elena Michaels, the world's only female werewolf. An orphan, Elena thought she finally found her \"happily ever after\" with her new love Clayton, until her life changed forever. With one small bite, the normal life she craved was taken away and she was left to survive life with the Pack.</p>","updated":1638776591,"_links":{"self":{"href":"https://api.tvmaze.com/shows/3"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/631862"}}}]
    it('set all shows in LocalStorge',()=>{
        model.getAllShows(allShows,PROPERTIES.CONSTANT.SORTEDSHOWS);
        const data="{\"Top Rated\":[{\"name\":\"Person of Interest\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg\",\"id\":2,\"rating\":8.9,\"summary\":\"<p>You are being watched. The government has a secret system, a machine that spies on you every hour of every day. I know because I built it. I designed the Machine to detect acts of terror but it sees everything. Violent crimes involving ordinary people. People like you. Crimes the government considered \\\"irrelevant\\\". They wouldn't act so I decided I would. But I needed a partner. Someone with the skills to intervene. Hunted by the authorities, we work in secret. You'll never find us. But victim or perpetrator, if your number is up, we'll find you.</p>\",\"averageRuntime\":60,\"seasonNo\":\"\"},{\"name\":\"Bitten\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_portrait/0/15.jpg\",\"id\":3,\"rating\":8.9,\"summary\":\"<p>Based on the critically acclaimed series of novels from Kelley Armstrong. Set in Toronto and upper New York State, <b>Bitten</b> follows the adventures of 28-year-old Elena Michaels, the world's only female werewolf. An orphan, Elena thought she finally found her \\\"happily ever after\\\" with her new love Clayton, until her life changed forever. With one small bite, the normal life she craved was taken away and she was left to survive life with the Pack.</p>\",\"averageRuntime\":60,\"seasonNo\":\"\"},{\"name\":\"Under the Dome\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg\",\"id\":1,\"rating\":6.5,\"summary\":\"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>\",\"averageRuntime\":60,\"seasonNo\":\"\"}]}";
        expect(global.Storage.prototype.setItem).toBeCalled()
        expect(mockStorage['visible']).toEqual(data)
    })
})

describe('searchShows',()=>{
  let searchResult=[{"score":0.90304744,"show":{"id":172,"url":"https://www.tvmaze.com/shows/172/suits","name":"Suits","type":"Scripted","language":"English","genres":["Drama","Legal"],"status":"Ended","runtime":60,"averageRuntime":60,"premiered":"2011-06-23","ended":"2019-09-25","officialSite":"http://www.usanetwork.com/suits","schedule":{"time":"21:00","days":["Wednesday"]},"rating":{"average":8.3},"weight":98,"network":{"id":30,"name":"USA Network","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":27518,"thetvdb":247808,"imdb":"tt1632701"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/393/983536.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/393/983536.jpg"},"summary":"<p><b>Suits</b> delves into the fast-paced, high-stakes world of a top Manhattan corporate law firm where hotshot associate Harvey Specter makes a risky move by hiring Mike Ross a brilliant but unmotivated college dropout, as his associate. As he becomes enmeshed in this unfamiliar world, Mike relies heavily on the firm's best paralegal Rachel Zane and Harvey's no-nonsense assistant Donna Paulsen to help him serve justice. With a photographic memory and the street smarts of a hustler, Mike proves to be a legal prodigy despite the absence of bonafide legal credentials.</p>","updated":1643504593,"_links":{"self":{"href":"https://api.tvmaze.com/shows/172"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/1715345"}}}}]
  it('set all shows from search in LocalStorge',()=>{
      model.getAllShows(searchResult,PROPERTIES.CONSTANT.TOPRESULT);
      const data="{\"Top Results\":[{\"name\":\"Suits\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_portrait/393/983536.jpg\",\"id\":172,\"rating\":8.3,\"summary\":\"<p><b>Suits</b> delves into the fast-paced, high-stakes world of a top Manhattan corporate law firm where hotshot associate Harvey Specter makes a risky move by hiring Mike Ross a brilliant but unmotivated college dropout, as his associate. As he becomes enmeshed in this unfamiliar world, Mike relies heavily on the firm's best paralegal Rachel Zane and Harvey's no-nonsense assistant Donna Paulsen to help him serve justice. With a photographic memory and the street smarts of a hustler, Mike proves to be a legal prodigy despite the absence of bonafide legal credentials.</p>\",\"averageRuntime\":60,\"seasonNo\":\"\"}]}";
      expect(global.Storage.prototype.setItem).toBeCalled()
      expect(mockStorage[PROPERTIES.LOCALSTORAGEKEYS.LASTSEARCHRESULT]).toEqual(data)
      expect(mockStorage['visible']).toEqual(data)
  })
})

describe('Search Seasons',()=>{

  let seasonData=[{"id":769,"url":"https://www.tvmaze.com/seasons/769/suits-season-1","number":1,"name":"","episodeOrder":12,"premiereDate":"2011-06-23","endDate":"2011-09-08","network":{"id":30,"name":"USA Network","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/393/983537.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/393/983537.jpg"},"summary":"<p>Harvey Specter, as one of Manhattan's top corporate lawyers sets out to recruit a new hotshot associate and hires the only guy that impresses him - Mike Ross, a brilliant but unmotivated college dropout. Though he isn't actually a lawyer, this legal prodigy has the book smarts of a Harvard law grad and the street smarts of a hustler. However, in order to serve justice and save their jobs, both these unconventional thinkers must continue the charade.</p>","_links":{"self":{"href":"https://api.tvmaze.com/seasons/769"}}}]
  it('set season data into localstorage',()=>{
    const data="{\"Seasons\":[{\"name\":\"\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_portrait/393/983537.jpg\",\"id\":769,\"rating\":\"\",\"summary\":\"<p>Harvey Specter, as one of Manhattan's top corporate lawyers sets out to recruit a new hotshot associate and hires the only guy that impresses him - Mike Ross, a brilliant but unmotivated college dropout. Though he isn't actually a lawyer, this legal prodigy has the book smarts of a Harvard law grad and the street smarts of a hustler. However, in order to serve justice and save their jobs, both these unconventional thinkers must continue the charade.</p>\",\"averageRuntime\":\"\",\"seasonNo\":1}]}";
    model.getAllShows(seasonData,PROPERTIES.CONSTANT.SEASONS);
    expect(global.Storage.prototype.setItem).toBeCalled()
      expect(mockStorage['visible']).toEqual(data)
  })
})

describe('Search Episode',()=>{

  let seasonData=[{"id":12493,"url":"https://www.tvmaze.com/episodes/12493/suits-1x01-pilot","name":"Pilot","season":1,"number":1,"type":"regular","airdate":"2011-06-23","airtime":"22:00","airstamp":"2011-06-24T02:00:00+00:00","runtime":60,"rating":{"average":9},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_landscape/70/176097.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/70/176097.jpg"},"summary":"<p>In the premiere of this legal drama, successful lawyer Harvey Specter (Gabriel Macht) hires brilliant college dropout Mike Ross (Patrick J. Adams) as a new associate at a top law firm despite the fact that Mike doesn't have a degree. In order to work together, both parties have to keep up the ruse to convince their coworkers that Mike is a real lawyer.</p>","_links":{"self":{"href":"https://api.tvmaze.com/episodes/12493"}}}]
  it('set season data into localstorage',()=>{
    const data="{\"Episode\":[{\"name\":\"Pilot\",\"image\":\"https://static.tvmaze.com/uploads/images/medium_landscape/70/176097.jpg\",\"id\":12493,\"rating\":9,\"summary\":\"<p>In the premiere of this legal drama, successful lawyer Harvey Specter (Gabriel Macht) hires brilliant college dropout Mike Ross (Patrick J. Adams) as a new associate at a top law firm despite the fact that Mike doesn't have a degree. In order to work together, both parties have to keep up the ruse to convince their coworkers that Mike is a real lawyer.</p>\",\"seasonNo\":1}]}";
    model.getAllShows(seasonData,PROPERTIES.CONSTANT.EPISODE);
    expect(global.Storage.prototype.setItem).toBeCalled()
      expect(mockStorage['visible']).toEqual(data)
  })
})

describe('get Item from local storage',()=>{
  model.setItemInLocalStorage("test","test")
  let mockValue=model.getItemFromLocalStorage("test")
  expect(mockValue).toEqual("test")

})

describe('catch block has been executed',()=>{
  console.log = jest.fn();
  const data={}
  model.getAllShows(data,PROPERTIES.CONSTANT.SORTEDSHOWS);
  expect(console.log.mock.calls.length).toBe(1)

})