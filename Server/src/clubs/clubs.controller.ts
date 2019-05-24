import { Controller, Get } from '@nestjs/common';
import { Club } from './club.entity';
import { DetailClub } from './detail.entity';
import { Schedule } from './schedule.entity';
import { History } from './history.entity';
import { ClubsService } from './clubs.service';

import { Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { ValidationPipe } from '../shared/piped/validation.pipe';
import { async } from 'rxjs/internal/scheduler/async';
import { promises } from 'fs';

@Controller('clubs')
export class ClubsController {
  constructor(private clubsService: ClubsService) { }
  @Get()
  index(): Promise<Club[]> {
    return this.clubsService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('/create')
  async create(@Body() clubData: Club): Promise<any> {
    return this.clubsService.create(clubData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() clubData: Club): Promise<any> {
    clubData.id = Number(id);
    console.log('Update #' + clubData.id)
    return this.clubsService.update(clubData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.clubsService.delete(id);
  }

  @Post('/addclubs')
  async addclub(@Body() clubData: Club[]): Promise<any> {
    console.log("clubData:",clubData['data']);
    for (var i = 0; i < clubData['data'].length; i++) {
      this.clubsService.create(clubData['data'][i]);
    }
    // const _club = await this.clubsService.findOne(clubData);
    // const errors = {User: ' not found'};
    // if (!_user) throw new HttpException({errors}, 401);

    // const {userName,password} = _user;
    // const user={userName,password,token};
    // return {user};
    return { "infor": "da them clubs thanh cong" };
  }
  @Get('/reset')
  async reset(): Promise<any> {
    this.clubsService.deleteAll();
    return { "infor": "da reset mua giai thanh cong" };
  }

  @Get('/show')
  async show(): Promise<Club[]> {
    return this.clubsService.findAll();
  }

  // check empty club array
  @Get('/checkempty')
  async check(): Promise<any> {

    return this.clubsService.findAll().then(res => {
      console.log(res.length, res);
      if (res.length !== 0) {
        return { "infor": "danh sach club dang full" };
      }
      else {
        return { "infor": "danh sach rong" };
      }
    })
      .catch(err => {
        return { "infor": "loi khong check duoc" };
      });
  }

  @Get(':id/show')
  async showOne(@Param('id') id): Promise<Club> {
    console.log('id=', id);
    return this.clubsService.findOne(id);
  }
  //------------------------
  @Get(':id/detail')
  async showOneDetail(@Param('id') id): Promise<any> {
    console.log('id=', id);
    return this.clubsService.findOneDetail(id)
      .then(res => {
        if (res.length == 0) {
          return { "infor": "thong tin rong" };
        }
        else {
          return res;
        }
      })
      .catch(err => {
        return { "infor": err };
      });
  }
  @Post(':id/adddetailclubs')
  async adddetailclubs(@Param('id') id, @Body() detailData: DetailClub): Promise<any> {
    detailData['data'].id = Number(id);
    this.clubsService.createDetailClub(detailData['data'])
      .then(res => {
        return { "infor": "da them thong tin chi tiet club thanh cong" };
      })
      .catch(err => {
        return { "infor": err };
      })
  }
  //--------------
  @Get('/schedule')
  async schedule(): Promise<any> {
    var temp = [];
    var matchSum = [];
    var result = [];
    return this.clubsService.findAll()
      .then(res => {
        for (var i = 0; i < res.length; i++) {
          temp.push(res[i].nameClub);
        }
        for (var j = 0; j < temp.length - 1; j++) {
          for (var k = j + 1; k < temp.length; k++) {
            matchSum.push([temp[j], temp[k]]);
          }
        }

        console.log(matchSum.length);

        for (var t = 0; t < matchSum.length - 1; t++) {
          result.push(matchSum[t]);
          for (var t1 = t + 1; t1 < matchSum.length; t1++) {
            if (matchSum[t].indexOf(matchSum[t1][0]) >= 0) {
              console.log(matchSum[t1][0]);
              continue;
            }
            else if (matchSum[t].indexOf(matchSum[t1][1]) >= 0) {
              console.log(matchSum[t1][1]);
              continue;
            }
            else {
              result.push(matchSum[t1]);
            }

          }
        }
        for (var r = 0; r < result.length; r++) {
          var matchData = new Schedule;
          matchData.teamA = result[r][0];
          matchData.teamB = result[r][1];
          matchData.red = "empty";
          matchData.yellow = "empty";
          matchData.score = "empty";
          this.clubsService.createMatchHistory(matchData);
        }
        return result;
      })
      .catch(err => {
        return { "infor": err };
      });
  }
  @Put(':id/updatematchinfor')
  async updateMatch(@Param('id') id, @Body() matchData: Schedule): Promise<any> {
    matchData.id = Number(id);
    console.log('Update #' + matchData.id)
    return this.clubsService.updateMatchInfor(matchData);
  }
  @Get(':id/match')
  async matchInfor(@Param('id') id): Promise<Schedule> {
    console.log('id=', id);
    return this.clubsService.findMatchInfor(id);
  }
  @Get('/matchs')
  async matchsInfor(): Promise<Schedule[]> {
    return this.clubsService.findMatchsInfor();
  }
  //-------------------------
  @Get('/ranking')
  async clubRanking(): Promise<any> {
    var ketqua = [];
    return this.clubsService.findHistory()
      .then(res => {
        if (res.length !== 0) {
         
          console.log(res);
          return res;
        }
        else {
          console.log("danh sach rong");
          this.clubsService.findMatchsInfor()
            .then(res => {
              for (var i = 0; i < res.length; i++) {
                if (res[i].score !== "empty") {
                  var s = res[i].score.split("|");
                  var historyData1 = new History;
                  var historyData2 = new History;
                  if (true) {
                    console.log("danh sach rong 1");
                    historyData1.shortName = res[i].teamA;
                    historyData1.matchNumber = 1;
                    historyData1.winNumber = 1;
                    historyData1.drawNumber = 0;
                    historyData1.loseNumber = 0;
                    historyData1.yellowNumber = res[i].yellow.split["|"][0]
                    historyData1.redNumber = res[i].yellow.split["|"][0]
                    historyData1.fNumber = res[i].score.split["|"][0]
                    historyData1.aNumber = res[i].score.split["|"][1]
                    historyData1.score = 3;

                    historyData2.shortName = res[i].teamB;
                    historyData2.matchNumber = 1;
                    historyData2.winNumber = 0;
                    historyData2.drawNumber = 0;
                    historyData2.loseNumber = 1;
                    historyData2.yellowNumber = res[i].yellow.split["|"][1]
                    historyData2.redNumber = res[i].yellow.split["|"][1]
                    historyData2.fNumber = res[i].score.split["|"][1]
                    historyData2.aNumber = res[i].score.split["|"][0]
                    historyData2.score = 3;

                    this.clubsService.createClubHistory(historyData1);
                    this.clubsService.createClubHistory(historyData2);
                  }

                }
              }

            })
            .catch(err => {

            });
        }

      })
      .catch(err => {

      });
  }


}
