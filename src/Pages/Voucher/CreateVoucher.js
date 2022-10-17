import React from "react";
import { PageTitle } from "../../Constant";
import axios from "axios";
import { useState, useEffect } from "react";
// import { Button, Paper ,Grid, Typography} from "@mui/material";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { colors, APIDATA } from "../../Constant";
import Chart from 'react-apexcharts'

import {

  Toolbar, Button,
  Paper,

  Typography,
  Box,
} from "@mui/material";
function CreateVoucher() {
  const [voucher, setVoucher] = useState();
  const [quantity, setQuantity] = useState();
  const [stat, setStat] = useState(null);




  const styles = {
    paper: {
      width: "50vw",
      padding: 10,
    },
    inpts: {
      margin: 5,
    },
    donuts: {
      marginLeft: 5,
      padding: 1

    },
    txt: {
      fontSize: 20,
      color: colors.bellefuGreen,
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: 1.5
    },
    smallH: {
      display: "flex",
      justifyContent: "space-between",
      padding: 2
    },
    btntest1: {
      backgroundColor: "rgb(254, 176, 25)",
      margin: 5,
    },
    btntest2: {
      backgroundColor: "rgb(0, 143, 251)",
      margin: 5,
    },
    btntest3: {
      backgroundColor: "rgb(0, 227, 150)",
      margin: 5,
    },
    countUp: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.bellefuGreen,
    },
    smallH2: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: 3
    }
  }


  const onSubmit = () => {


    if (voucher === undefined || quantity === undefined) {
      setVoucher('')
      setQuantity('')
      toast.error('All fields are required', {
        position: 'top-right'
      })

    } else {
      const formDatas = new FormData()

      formDatas.append('voucher_amount', voucher)
      formDatas.append('voucher_quantity', quantity)
      formDatas.append('admin_id', 76)


      axios({
        method: 'POST',
        url: `${APIDATA}create/new/voucher`,
        data: formDatas,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))

      toast.success('Voucher Generated', {
        position: 'top-right'
      })


      setVoucher()
      setQuantity()





    }

  }



  useEffect(() => {

    const getprogram = async () => {
      await axios.get(`${APIDATA}voucher/stats`)
        .then(res => {
          // console.log(res.data.data)
          setStat(res.data.data)
        })
        .catch(err => console.log(err))
    }

    getprogram()
  }, [])


  console.log(stat)
  const total = stat !== null ? stat[0].count + stat[1].count : null
  const consumed = stat !== null ? stat[0].count : null
  const created = stat !== null ? stat[1].count : null



  var arr = []

  for (var i = 0; i < stat?.length; i++) {

    arr.push(stat[i].count, total)
    console.log('array loop ==>', arr)
  }


  const newarr = arr.filter(item => item !== undefined)
  const theArr = [...new Set(newarr)]

  console.log(' newarr===>', theArr);


  const seriesArr = stat?.map(item => item.count)

  const sum = seriesArr?.reduce((a, b) => a + b, 0);

  console.log(' newarr===>', seriesArr);
  console.log('sum===>', sum);

  const [data, setData] = useState({
    options: {
      series: [31, 33, 2],
      labels: ['Unused', 'Created', 'Consumed',]
    },
    series: theArr.length > 0 ? theArr : [31, 33, 2]
  })
  return (
    <div>
      <PageTitle title="Create Vouchers" />
      <Toolbar />
      <Box style={{ display: "flex" }}>
        <Box>
          <Paper sx={styles.paper}>
            <Box sx={styles.inpts}>
              <TextField
                sx={{ position: "relative",
                left: "7vw", width: 400 }}
                id="outlined-basic"
                label="Enter-Voucher-Amount"
                error={voucher === ''}
                helperText={voucher === '' ? 'Please enter Voucher Amount' : ''}
                // borderColor='green'
                type="text"
                onChange={(e) => setVoucher(e.target.value)}
                value={voucher}
                variant="outlined"
              />
            </Box>
            <Box sx={styles.inpts}>
              <TextField
                sx={{ position: "relative",
                left: "7vw", width: 400 }}
                id="outlined-basic"
                label="Enter-Voucher-Quantity"
                error={quantity === ''}
                helperText={quantity === '' ? 'Please enter Quantity' : ''}
                // borderColor='green'
                type="text"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
                variant="outlined"
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                style={{
                  position: "relative",
                  left: "9.7vw",
                  margin: 10,
                  width: "20vw",
                  backgroundColor: colors.bellefuGreen,
                }}
                onClick={onSubmit}
              >
                Generate
              </Button>
            </Box>
          </Paper>
        </Box>
        <Box>
          <Paper sx={styles.donuts}>
            <div className="donut">
              {theArr.length > 0 ? <Chart options={data.options} series={data.series} type="donut" width="320" /> : null}
            </div>
            {/* <Donut unused={unused} created={total} consumed={consumed} /> */}
          </Paper>

          <Toolbar />

          <Paper sx={styles.donuts}>
            <Typography variant="h5" sx={styles.txt}>
              Voucher Summary
            </Typography>


            <Box sx={styles.smallH}>
              <Button variant="contained" style={styles.btntest1}>
                <small style={{ fontSize: 8, fontWeight: "bold" }}>
                  Sold
                  <br />
                  Voucher
                </small>
              </Button>
              <Button style={styles.btntest2} variant="contained">
                <small style={{ fontSize: 8, fontWeight: "bold" }}>
                  Unused
                  <br /> Voucher
                </small>
              </Button>
              <Button style={styles.btntest3} variant="contained">
                <small style={{ fontSize: 8, fontWeight: "bold" }}>
                  Total
                  <br /> Voucher
                </small>
              </Button>
            </Box>
            <Box sx={styles.smallH2}>
              <Typography variant="h3" sx={styles.countUp}>

                {consumed}
              </Typography>
              <Typography variant="h3" sx={styles.countUp}>

                {created}
              </Typography>
              <Typography variant="h3" sx={styles.countUp}>
                {total}

              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}

export default CreateVoucher;
